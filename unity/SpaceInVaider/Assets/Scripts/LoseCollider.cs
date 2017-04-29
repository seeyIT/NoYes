using UnityEngine;
using System.Collections;

public class LoseCollider : MonoBehaviour {

    private LevelManager levelManager = new LevelManager();

	void OnTriggerEnter2D(Collider2D other)
    {
        
        Destroy(other.gameObject);
        levelManager.LoadLevel("Win");
    }
    
}
