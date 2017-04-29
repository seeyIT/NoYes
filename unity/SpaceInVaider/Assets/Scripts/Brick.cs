using UnityEngine;
using System.Collections;

public class Brick : MonoBehaviour {

    public int maxHits;

    private int timesHits;

	// Use this for initialization
	void Start () {
        timesHits = 0;
	}
	
    void OnCollisionEnter2D(Collision2D other)
    {
        timesHits++;
    }

	// Update is called once per frame
	void Update () {
	
	}
}
