<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image to Vector Representation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #output {
            margin-top: 20px;
        }
        .vector-output {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Image to Vector Representation</h1>
    <input type="file" id="fileInput" accept="image/*" multiple>
    <canvas id="canvas" style="display: none;"></canvas>
    <div id="output"></div>

    <script>
        document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

        function handleFileSelect(event) {
            const files = event.target.files;
            const output = document.getElementById('output');
            output.innerHTML = '';

            for (const file of files) {
                if (!file.type.match('image.*')) continue;

                const reader = new FileReader();

                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = () => {
                        const canvas = document.getElementById('canvas');
                        const ctx = canvas.getContext('2d');

                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);

                        const imageData = ctx.getImageData(0, 0, img.width, img.height);
                        const vector = imageToVector(imageData);

                        const vecString = vector.slice(0, 10).join(', ') + (vector.length > 10 ? '...' : '');
                        const vecLength = vector.length;

                        const div = document.createElement('div');
                        div.classList.add('vector-output');
                        div.innerHTML = `<p><strong>Image:</strong> ${file.name}</p>
                                         <p><strong>Vector (first 10 components):</strong> [${vecString}]</p>
                                         <p><strong>Vector Length:</strong> ${vecLength}</p>`;
                        output.appendChild(div);
                    };
                };

                reader.readAsDataURL(file);
            }
        }

        function imageToVector(imageData) {
            const data = imageData.data;
            const vector = [];

            for (let i = 0; i < data.length; i += 4) {
                // Convert each pixel to a grayscale value (average of R, G, B values)
                const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                vector.push(gray);
            }

            return vector;
        }
    </script>
</body>
</html>
