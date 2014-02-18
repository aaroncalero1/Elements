#pragma strict

function OnDestroy(){
	
	var cam: GameObject = GameObject.Find("Ortographic camera");

	if(cam){
		var spwn : spawner = cam.GetComponent('spawner');
		var mv : move2 = this.gameObject.GetComponent('move2');
		spwn.numberOfParticles--;
		Destroy(mv.txt.gameObject);
	}
}