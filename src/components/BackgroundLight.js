import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const BackgroundLight = ({
  initialX = 1.4, // Default starting position off-screen
  color = { r: 1.0, g: 0.8, b: 0.4 }, // Default light color
  glowRadius = 0.35, // Default glow radius
  intensity = 2.0, // Default intensity
  opacity = 0, // Default opacity (for fade-in)
  wiggleAmount = 70, // Larger wiggle range
  verticalWiggleAmount = 30, // Larger vertical wiggle range
  fadeDuration = 3, // Fade-in duration
  wiggleSpeed = 5, // Faster wiggle for noticeable effect
  lightDirection = 1.1, // Controls the starting position: left (0.1) or right (1.1)
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Vertex Shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader - Realistic Light with Smooth Diffusion
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_lightPos;
      uniform float u_glowRadius;
      uniform float u_intensity;
      uniform float u_opacity;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float dist = length(gl_FragCoord.xy - u_lightPos);

        // Soft Glow Effect
        float glow = smoothstep(0.9, 0.2, dist / u_glowRadius);
        glow *= exp(-dist / u_glowRadius) * u_intensity;

        // Better Spread with No Overexposed Core
        float spread = exp(-pow(dist / (u_glowRadius * 1.5), 2.0));
        float finalGlow = mix(spread, glow, 0.7); 

        // Smooth Blending for a Natural Look
        vec3 color = vec3(${color.r}, ${color.g}, ${color.b}) * finalGlow;

        gl_FragColor = vec4(color, finalGlow * u_opacity);  // Apply opacity to the glow
      }
    `;

    // Compile Shaders
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Create Shader Program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen Quad
    const vertices = new Float32Array([
      -1, -1,   1, -1,   -1, 1,
      -1, 1,    1, -1,    1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    // Get Uniform Locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const lightPosLocation = gl.getUniformLocation(program, "u_lightPos");
    const glowRadiusLocation = gl.getUniformLocation(program, "u_glowRadius");
    const intensityLocation = gl.getUniformLocation(program, "u_intensity");
    const opacityLocation = gl.getUniformLocation(program, "u_opacity");

    // Light properties
    const lightProps = {
      x: window.innerWidth * initialX, // Starts off-screen based on passed prop
      y: window.innerHeight * 0.5,
      radius: window.innerWidth * glowRadius, // Default glow radius
      intensity: intensity, // Dynamic light intensity
      opacity: opacity, // Fade-in effect starting opacity
    };

    // Render Loop
    const render = () => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(lightPosLocation, lightProps.x, lightProps.y);
      gl.uniform1f(glowRadiusLocation, lightProps.radius);
      gl.uniform1f(intensityLocation, lightProps.intensity);
      gl.uniform1f(opacityLocation, lightProps.opacity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    setTimeout(() => {
      render();
    }, 500);

    // GSAP Animation - Light Starts From Defined Position and Wiggles
    gsap.to(lightProps, {
      x: window.innerWidth * lightDirection, // Controls the starting position: left (0.1) or right (1.1)
      duration: 4.5,
      ease: "power2.out",
      onComplete: () => {
        // Realistic Wiggle Animation (Non-uniform wiggle)
        const wiggleRange = lightProps.x + wiggleAmount; // Keep the wiggle relative to the starting position
        gsap.to(lightProps, {
          x: wiggleRange, // Wiggle within the range
          duration: wiggleSpeed,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5, // Introduces some delay between each wiggle
        });

        // Vertical wiggle effect
        gsap.to(lightProps, {
          y: `+=${verticalWiggleAmount}`, // Larger vertical shift for depth
          duration: 4.0,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3, // Add stagger for more natural behavior
        });

        // Opacity Wiggle (Breathing effect)
        gsap.to(lightProps, {
          opacity: 0.8, // Full opacity
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    // Pulsing Glow Intensity for a Breathing Effect
    gsap.to(lightProps, {
      radius: window.innerWidth * glowRadius * 1.1, // Soft expansion
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(lightProps, {
      intensity: intensity + 0.3, // Smooth dynamic brightness
      duration: 4.0,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Fade-In Effect for Light
    gsap.to(lightProps, {
      opacity: 1, // Gradually reveal the light
      duration: fadeDuration,
      ease: "power2.out",
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteProgram(program);
    };
  }, [initialX, color, glowRadius, intensity, opacity, wiggleAmount, verticalWiggleAmount, fadeDuration, wiggleSpeed, lightDirection]);

  return <canvas ref={canvasRef} className="shader-background"></canvas>;
};

export default BackgroundLight;
