#pragma strict

private var direction : Vector3;
private var speed : float = 4.5;

function Start(){
	direction = new Vector3(Random.Range(-10.0,10.0),Random.Range(-10.0,10.0),Random.Range(-10.0,10.0));
}

function Update () {
	var newDir = new Vector3(Random.Range(direction[0]-0.2,direction[0]+0.2),
							 Random.Range(direction[1]-0.2,direction[1]+0.2),
							 Random.Range(direction[2]-0.2,direction[2]+0.2));
	direction = newDir/newDir.magnitude;

	var myPosition = transform.position;	
	if((myPosition.x>8 && direction.x>=0) || (myPosition.x<-8 && direction.x<=0)){
		direction.x=-direction.x;
	}
	if((myPosition.y>4 && direction.y>=0) || (myPosition.y<-4 && direction.y<=0)){
		direction.y=-direction.y;
	}
	if((myPosition.z>6 && direction.z>=0) || (myPosition.z<-6 && direction.z<=0)){
		direction.z=-direction.z;
	}

	transform.position=transform.position+speed*direction/direction.magnitude*Time.deltaTime;

	transform.rotation = new Quaternion(Random.Range(transform.rotation.x-0.1,transform.rotation.x+0.1),
										Random.Range(transform.rotation.y-0.1,transform.rotation.y+0.1),
										Random.Range(transform.rotation.z-0.1,transform.rotation.z+0.1),
										Random.Range(transform.rotation.w-0.1,transform.rotation.w+0.1));
}