using UnityEngine;
using System.Collections;

public class SpawnBall : MonoBehaviour {

    public GameObject ball;
    
    Vector3 spawnPosition = new Vector3(0f, 1f, 0f);
    Quaternion spawnRotation = Quaternion.Euler(0f, 0f, 0f);
    

   

    void Start()
    {
       Spawn();
    }

    public void Spawn()
    {
        Rigidbody ballSpawn;
        ballSpawn = Instantiate(ball, spawnPosition, spawnRotation) as Rigidbody;
        
    }

   
}
