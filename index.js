window.addEventListener("DOMContentLoaded", () => {
    new Scenery('scenery_id').run();
});

class Scenery {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
    }

    run() {
        this.make_scene();
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
    
    
    make_scene() {   
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);
        camera.setPosition(new BABYLON.Vector3(-10, 3, 0));
        camera.attachControl(this.canvas, true);

        var music = new BABYLON.Sound("Music", "assets/sea_waves.mp3", this.scene, null, { loop: true, autoplay: true });
        
        var sun_position = new BABYLON.Vector3(38, 6.0, 50.0); // so the light originates from the sun's position
        var light = new BABYLON.PointLight("light", sun_position, this.scene);
        light.specular = new BABYLON.Color3(1, 1, 0); // make the light's color yellow, like the sun
        light.intensity = 0.5; // dim the light to half its strenght.

        var skybox = BABYLON.Mesh.CreateBox("skyBox", 300.0, this.scene);
        var skybox_material = new BABYLON.StandardMaterial("skyBox", this.scene);
        skybox_material.backFaceCulling = false;
        skybox_material.reflectionTexture = new BABYLON.CubeTexture("assets/umhlanga_beach_4k", this.scene);
        skybox_material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.material = skybox_material;

        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:5}, this.scene);
        var material = new BABYLON.StandardMaterial("kosh", this.scene);
        material.refractionTexture = new BABYLON.CubeTexture("assets/umhlanga_beach_4k", this.scene);
        material.reflectionTexture = new BABYLON.CubeTexture("assets/umhlanga_beach_4k", this.scene);
        // various material params, mostly adjusted from the babylonjs demos.
        material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        material.invertRefractionY = false;
        material.indexOfRefraction = 0.97;
        material.specularPower = 256;

        material.refractionFresnelParameters = new BABYLON.FresnelParameters();
        material.refractionFresnelParameters.power = 2;
        material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        material.reflectionFresnelParameters.power = 2;
        material.reflectionFresnelParameters.leftColor = BABYLON.Color3.Black();
        material.reflectionFresnelParameters.rightColor = BABYLON.Color3.White();

        sphere.material = material;
    }
}
