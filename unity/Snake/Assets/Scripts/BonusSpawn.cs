using UnityEngine;
using System.Collections;

public class BonusSpawn : MonoBehaviour {

    public GameObject bonus;
    
    public static bool startSpawn=true;

    private bool freePosition = true;

     void Update()
    {
        if (startSpawn)
        {
            Vector3 ranges = new Vector3(Mathf.Round(Random.Range(-9f, 9f)), 0.8f, Mathf.Round(Random.Range(-4f, 4f)));
            
            int amountBodyPart = GameObject.FindGameObjectsWithTag("Body").Length;
            for (int i = 0; i < amountBodyPart; i++)
            {
                if (GameObject.FindGameObjectsWithTag("Body")[i].transform.position == ranges)
                {
                    freePosition = false;
                }
                

            }
            if (freePosition)
            {
                    GameObject spawnPlace;
                    spawnPlace = Instantiate(bonus, ranges, Quaternion.identity) as GameObject;
                    startSpawn = false;
                    
                
            }
            else
            {
                freePosition = true;
            }
           
        }
     }

}
