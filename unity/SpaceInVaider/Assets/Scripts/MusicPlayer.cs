using UnityEngine;
using System.Collections;

public  class MusicPlayer : MonoBehaviour {

    static MusicPlayer musicPlayer=null;

	// Use this for initialization
	void Awake () {
        if(musicPlayer!=null)
        {
            Destroy(gameObject);

        }
        else
        {
            musicPlayer = this;
            GameObject.DontDestroyOnLoad(musicPlayer);
        }
        
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
