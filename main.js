function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        //dompet tampak depan atas
        0.27, 0.3, 0.32, 0.32, 0.32,
        0.27, -0.3, 0.32, 0.32, 0.32,
        0.2, -0.3, 0.15, 0.15, 0.15,

        0.27, 0.3, 0.32, 0.32, 0.32,
        0.73, 0.3, 0.64, 0.64, 0.64,
        0.27, -0.3, 0.32, 0.32, 0.32,

        0.73, 0.3, 0.64, 0.64, 0.64,
        0.73, -0.3, 0.32, 0.32, 0.32,
        0.27, -0.3, 0.32, 0.32, 0.32,

        0.73, 0.3, 0.64, 0.64, 0.64,
        0.8, -0.3, 0.32, 0.32, 0.32,
        0.73, -0.3, 0.32, 0.32, 0.32,

        //dompet tampak belakang atas
        -0.73, 0.3, 0.64, 0.64, 0.64,
        -0.73, -0.3, 0.64, 0.64, 0.64,
        -0.8, -0.3, 0.32, 0.32, 0.32,

        -0.73, 0.3, 0.64, 0.64, 0.64,
        -0.27, 0.3, 0.32, 0.32, 0.32,
        -0.73, -0.3, 0.64, 0.64, 0.64,

        -0.27, 0.3, 0.32, 0.32, 0.32,
        -0.27, -0.3, 0.32, 0.32, 0.32,
        -0.73, -0.3, 0.64, 0.64, 0.64,

        -0.27, 0.3, 0.32, 0.32, 0.32,
        -0.2, -0.3, 0.32, 0.32, 0.32,
        -0.27, -0.3, 0.32, 0.32, 0.32,

        -0.8, -0.3, 0.32, 0.32, 0.32,
        -0.2, -0.3, 0.32, 0.32, 0.32,
        -0.8, -0.38, 0.15, 0.15, 0.15,

        -0.2, -0.3, 0.32, 0.32, 0.32,
        -0.2, -0.38, 0.15, 0.15, 0.15,
        -0.8, -0.38, 0.15, 0.15, 0.15
    ];

    
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;

        void main() {
            gl_Position = vec4(aPosition + uChange, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;

        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    // var speedRaw = 0.0104;
    var speed = 0.0104;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");
    

    function render() {
		
        if (change >= 0.25 || change <= -0.25) {
            speed = -speed;
        }
        
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLES, 0, 30);
		
    }

    setInterval(render, 1000 / 30);
}
