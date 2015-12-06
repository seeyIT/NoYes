using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class DeathZone : MonoBehaviour {

    public Text textScore;

    static int leftPoints = 0;
    static int rightPoints = 0;

    public GameObject ball;

    void OnTriggerEnter(Collider other)
    {
               
        
        Destroy(other.gameObject); 
        AddPoints();

        StartCoroutine(Pause());        
    }

    IEnumerator Pause()
    {
           
        yield return new WaitForSeconds(1.0f);
        SpawnBall spawnBall = new SpawnBall();
        spawnBall.ball = ball;
        spawnBall.Spawn();
    }

    void AddPoints()
    {
        if (gameObject.name == "DeathZoneLeft")
        {
            rightPoints++;
        }
        else
        {
            leftPoints++; 
        }

        textScore.text = leftPoints + ":" + rightPoints;
    }
}
