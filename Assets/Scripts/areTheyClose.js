#pragma strict

var x1:float;
var y1:float;
var x2:float;
var y2:float;
var eps: float = 2;
var h2 : GameObject;
var h22 : GameObject;
var o2 : GameObject;
var h2o : GameObject;

private var i:float;
private var j:float;
private var mv : move2;
private var particulasPulsadas : Array;
private var c = new Coleccion();

function Update () {
	var particulas : GameObject[] = GameObject.FindGameObjectsWithTag('Particula');
	particulasPulsadas = new Array();
	for(i=0;i<particulas.length;i++){
		mv = particulas[i].gameObject.GetComponent('move2');
		if(mv.canMove){
			particulasPulsadas.Push(particulas[i].gameObject);
		}
	}

//Debug.Log(particulasPulsadas.length);

	//	ahora mismo en particulasPulsadas tenemos todas las particulas quietas En lugar de iterar sobre todos los input touches (que incluye dedos 
	//tocando la pantalla que pueden no estar pulsando ninguna particula) iteraremos sobre las particulas pulsadas.
			
	var l:int=particulasPulsadas.length;
	var end = false;
	if(l > 1) {
		for(i = 0; i < l && !end; i++){
			var pi : GameObject = particulasPulsadas[i];
			mv = pi.gameObject.GetComponent('move2');
			x1=Input.GetTouch(mv.touchNumber).position.x;
			y1=Input.GetTouch(mv.touchNumber).position.y;
//			x1 = pi.transform.position.x;
//			y1 = pi.transform.position.y;
			for(j = i+1; j < l; j++){
				var pj : GameObject = particulasPulsadas[j];
				mv = pj.gameObject.GetComponent('move2');
				x2=Input.GetTouch(mv.touchNumber).position.x;
				y2=Input.GetTouch(mv.touchNumber).position.y;
//				x2 = pj.transform.position.x;
//				y2 = pj.transform.position.y;
				//miramos si x2 esta en un radiominimo de 1(cambiable) respecto a x
				//y lo mismo respecto de y
//				Debug.Log(Mathf.Abs(x1-x2)+" -- "+Mathf.Abs(y1-y2)+ " -- eps: "+eps);
				if(Mathf.Abs(x1-x2) <= eps && Mathf.Abs(y1-y2) <= eps){
					//hay que mandarle parametros de los touch que se van a mirar si pueden encajar
					if(canMatch(i,j)){
						end = true;
						break;
					}
				}				
			}
		}
	}
}

function canMatch(i : int, j: int){
	//miramos en el fichero de variables si se pueden asociar
	
	//si se pueden, destruimos ambas y creado la reaccion y la ponemos en movimiento y tal
	
	//en caso de que haya ido bien devolvemos true para que haga un break o algo
	
	var c1 : GameObject = particulasPulsadas[i];
	var c2 : GameObject = particulasPulsadas[j];
	var mv1 : move2 = c1.GetComponent('move2');
	var mv2 : move2 = c2.GetComponent('move2');
	var txt1 : String = mv1.txt.name;
	txt1 = txt1.Substring(0,txt1.length-7);
	var txt2 : String = mv2.txt.name;	
	txt2 = txt2.Substring(0,txt2.length-7);
	Debug.Log("txt1: "+txt1+" -- txt2: "+txt2);
	for (var k= 0;k<c.reacciones.length; k++){
		var rc : Reaccion = c.reacciones[k];
		if(txt1 == rc.r1 && txt2 == rc.r2){
			//reaccion: eliminar particulas reactivas, crear resultado
			var npos : Vector3 = (c1.transform.position + c2.transform.position)/2;
			Destroy(c1);
			Destroy(c2);
			spawn(rc.res, rc.nr, npos);
			return true;
		}
	}
	return false;
	
}

function spawn(element : String, number : int, pos : Vector3){
	var instance : GameObject;
	var particleID : pid;
	var moveComp: move2;
	var ps : Transform;
	var cam: GameObject = GameObject.Find("Ortographic camera");
	var spwn : spawner = cam.GetComponent('spawner');
	var prefab : GameObject;

	switch(element){
		case "H2":
			prefab = h2;
			break;
		case "2H2":
			prefab = h22;
			break;
		case "O2":
			prefab = o2;
			break;
		case "H2O":
			prefab = h2o;
			break;
		default: break;
	}
	for (var rep=0;rep<number;rep++){
		instance = Instantiate(prefab,pos,Quaternion.identity);
		instance.AddComponent('destroy');
	//	particleID = instance.gameObject.GetComponent("pid");
	//	particleID.pid = pid++;
		moveComp = instance.gameObject.GetComponent("move2");
		ps = instance.transform.GetChild(0);
		moveComp.timeToLive = ps.GetComponent(ParticleSystem).duration + 1;
		moveComp.cam = cam;
		spwn.numberOfParticles++;
	}
}

