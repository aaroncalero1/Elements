#pragma strict

var oxygen: GameObject;
var hydrogen: GameObject;
var time: float = 2;
var startTime: float = 0;
var startNumberOfParticles: int=2;
var numberOfParticles: int=0;
var maxNumberOfParticles: int=7;

private static var pid: int=0;

function Start(){

	for(var i=0;i<startNumberOfParticles;i++){
		randomInstance();
		numberOfParticles++;
	}

}

function Update () {
	startTime += Time.deltaTime;
	if(startTime>time && numberOfParticles<maxNumberOfParticles){
		randomInstance();
		startTime=0;
		numberOfParticles++;
	}
}

function randomInstance(){
	var r = Random.Range(0.0,1.0);
	var instance : GameObject;
	if(r<=0.5){
		instance = Instantiate(oxygen,new Vector3(Random.Range(-8.0,8.0),Random.Range(-4.0,4.0),Random.Range(-6.0,6.0)),Quaternion.identity);
	} else {
		instance = Instantiate(hydrogen,new Vector3(Random.Range(-8.0,8.0),Random.Range(-4.0,4.0),Random.Range(-6.0,6.0)),Quaternion.identity);
	}
	instance.AddComponent('destroy');
	var particleID : pid = instance.gameObject.GetComponent("pid");
	particleID.pid = pid++;
	var moveComp: move2 = instance.gameObject.GetComponent("move2");
	var ps : Transform = instance.transform.GetChild(0);
	moveComp.timeToLive = ps.GetComponent(ParticleSystem).duration + 1;
	moveComp.cam = this.gameObject;
}