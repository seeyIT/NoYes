using UnityEngine;
using System.Collections;

public class AddBonusPoints : MonoBehaviour {


    void OnTriggerEnter(Collider other)
    {
        Destroy(gameObject);
        PlayerMovement.maxBodyLength++;
        BonusSpawn.startSpawn = true;
        PlayerMovement.velocityForward -= 0.2f;
    }
}
