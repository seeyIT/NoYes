using UnityEngine;
using System.Collections;

public class BallMove : MonoBehaviour {

    
    void Awake()
    {
        float randomX = Random.Range(-1f, 1f);
        float randomZ = Random.Range(-1f, 1f);
        if (randomX < 0)
            randomX = -1;
        else
            randomX=1;

        if (randomZ < 0)
            randomZ = -1;
        else
            randomZ = 1;

        GetComponent<Rigidbody>().AddForce(new Vector3(Random.Range(200f, 350f) * randomX, 0f, Random.Range(200f, 350f) * randomZ));
    }
	
}
