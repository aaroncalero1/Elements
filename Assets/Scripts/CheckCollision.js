#pragma strict

function Update () {

var particulas : GameObject[] = GameObject.FindGameObjectsWithTag('Particula');
var particulasPulsadas = new Array();

for(var i=0;i<particulas.length;i++){
	var mv : move2 = particulas[i].gameObject.GetComponent('move2');
	if(mv.canMove){
		particulasPulsadas.Push(particulas[i]);
	}
}

Debug.Log(particulasPulsadas.length);

}