# Threlte Model Pipeline Components

This directory holds automatically generated Threlte components from GLTF models.

Place your models in `static/models` and run `npm run model-pipeline:run` to generate the components.


npx @threlte/gltf@latest static/models/lumen64_final.glb --shadows --transform --resolution=4096 --simplify --keepnames --root=models/




  gltf.then(( model ) => {
    function alphaFix(material){
      material.depthWrite = true;
      material.depthTest = true;
      material.opacity = 1;
      material.alphaToCoverage = true;
      material.blending = 0;
      console.log(material)
    }
    function metalFix(material){
      material.metalness = 0.8;
      material.roughness = 0.5;
    }
    function roughnessFix(material){
      material.roughness = 0;
    }
    function zIndexFix(material){
      material.depthWrite = true;
      material.depthTest = true;
    }
    zIndexFix(model.materials.cable_bolt_canvas)
    alphaFix(model.materials.glass);
    metalFix(model.materials.big_details);
    roughnessFix(model.materials.panel_and_bottom_details);

  })

  onMount(() => {
    let actionsBool = false;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'a') {
        actionsBool = !actionsBool
          
          for (const action in $actions) {
            if(actionsBool){
              $actions[action].play()
            }else{
              $actions[action].stop()
            }
          }
      }
    })
  })