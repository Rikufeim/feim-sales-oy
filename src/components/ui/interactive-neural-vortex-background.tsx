import React, { useEffect, useRef } from "react";

type InteractiveNeuralVortexProps = {
  className?: string;
  backgroundOnly?: boolean;
};

const InteractiveNeuralVortex = ({ className = "", backgroundOnly = false }: InteractiveNeuralVortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
  const animationRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const lastFrameTsRef = useRef(0);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldAnimate = !(backgroundOnly && prefersReducedMotion);
    const targetFrameMs = backgroundOnly ? 1000 / 30 : 1000 / 60;
    const maxDpr = backgroundOnly ? 1.2 : 2;

    const gl =
      (canvasEl.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: backgroundOnly ? "low-power" : "default",
      }) as WebGLRenderingContext | null) ||
      (canvasEl.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;
      
      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }
      
      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2);
        }
        return res.x + res.y;
      }
      
      void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = .5 * pow(1. - p, 2.);
        float t = .001 * u_time;
        vec3 color = vec3(0.);
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(.0, noise - .5);
        noise *= (1. - length(vUv - .5));
        color = vec3(0.5, 0.15, 0.65);
        color = mix(color, vec3(0.02, 0.7, 0.9), 0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2));
        color += vec3(0.15, 0.0, 0.6) * sin(2.0 * u_scroll_progress + 1.5);
        vec3 base = vec3(0.01, 0.02, 0.06);
        vec3 finalColor = base + color * noise * 1.35;
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRatio = gl.getUniformLocation(program, "u_ratio");
    const uPointerPosition = gl.getUniformLocation(program, "u_pointer_position");
    const uScrollProgress = gl.getUniformLocation(program, "u_scroll_progress");

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const rect = canvasEl.getBoundingClientRect();
      const width = Math.max(1, Math.floor((rect.width || window.innerWidth) * dpr));
      const height = Math.max(1, Math.floor((rect.height || window.innerHeight) * dpr));
      canvasEl.width = width;
      canvasEl.height = height;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      if (uRatio) gl.uniform1f(uRatio, canvasEl.width / canvasEl.height);
    };

    const drawFrame = (currentTime: number) => {
      if (backgroundOnly && currentTime - lastFrameTsRef.current < targetFrameMs) return;
      lastFrameTsRef.current = currentTime;

      pointer.current.x += (pointer.current.tX - pointer.current.x) * 0.2;
      pointer.current.y += (pointer.current.tY - pointer.current.y) * 0.2;

      if (uTime) gl.uniform1f(uTime, currentTime);
      if (uPointerPosition) {
        const rect = canvasEl.getBoundingClientRect();
        const width = rect.width || window.innerWidth;
        const height = rect.height || window.innerHeight;
        const relX = (pointer.current.x - rect.left) / width;
        const relY = (pointer.current.y - rect.top) / height;
        gl.uniform2f(
          uPointerPosition,
          Math.min(1, Math.max(0, relX)),
          1 - Math.min(1, Math.max(0, relY))
        );
      }
      if (uScrollProgress) {
        gl.uniform1f(uScrollProgress, window.pageYOffset / (2 * window.innerHeight));
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const render = (ts: number) => {
      if (!visibleRef.current) return;
      drawFrame(ts);
      animationRef.current = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!shouldAnimate) {
        drawFrame(performance.now());
        return;
      }
      if (animationRef.current != null) return;
      animationRef.current = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (animationRef.current != null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.current.tX = e.clientX;
      pointer.current.tY = e.clientY;
    };

    const handleVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
      if (visibleRef.current) startLoop();
      else stopLoop();
    };

    gl.clearColor(0.01, 0.02, 0.06, 1.0);
    resizeCanvas();
    startLoop();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("visibilitychange", handleVisibility);

    let observer: IntersectionObserver | null = null;
    if (backgroundOnly) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          visibleRef.current = !!entry?.isIntersecting;
          if (visibleRef.current) startLoop();
          else stopLoop();
        },
        { threshold: 0.01 }
      );
      observer.observe(canvasEl);
    }

    return () => {
      stopLoop();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer?.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      if (vertexBuffer) gl.deleteBuffer(vertexBuffer);
    };
  }, []);

  if (backgroundOnly) {
    return (
      <canvas
        ref={canvasRef}
        id="neuro"
        className={`absolute inset-0 h-full w-full pointer-events-none ${className}`.trim()}
      />
    );
  }

  return (
    <div className={`relative isolate min-h-screen w-full overflow-x-hidden font-sans ${className}`.trim()}>
      <canvas ref={canvasRef} id="neuro" className="fixed inset-0 z-0 h-full w-full pointer-events-none opacity-100" />

      <section className="relative z-10 flex min-h-screen w-full items-center justify-center px-6">
        <div className="outline-style animate-seq w-full max-w-2xl rounded-3xl px-8 py-14 text-center backdrop-blur-md">
          <h1 className="geist-heading geist-h1">Step Into the Future of VR</h1>
          <p className="geist-heading geist-h2 mb-9 text-white/60">
            ImmersiaVR delivers breathtaking realism, seamless interaction, and endless possibilities for gaming,
            education, and beyond.
          </p>
          <a href="#get-started" className="outline-btn inline-block rounded-xl px-8 py-4 font-semibold text-white">
            Get Started
          </a>
        </div>
      </section>

      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-seq { animation: slideInUp 0.8s both; }
        .geist-heading {
          font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 0.5em;
        }
        .geist-h1 { font-size: 48px; line-height: 1.05; }
        @media (min-width: 768px) { .geist-h1 { font-size: 64px; } }
        .geist-h2 { font-size: 20px; line-height: 1.2; }
        .outline-style, .outline-btn, .outline-card {
          border: 2px solid rgba(255,255,255,0.10) !important;
          background: transparent;
          box-shadow: none;
        }
        a { text-decoration: none !important; }
      `}</style>
    </div>
  );
};

export default InteractiveNeuralVortex;
