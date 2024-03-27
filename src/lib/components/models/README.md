# Threlte Model Pipeline Components

This directory holds automatically generated Threlte components from GLTF models.

Place your models in `static/models` and run `npm run model-pipeline:run` to generate the components.


npx @threlte/gltf@latest static/models/lumen64_final.glb --shadows --transform --resolution=4096 --simplify --keepnames --root=models/