using UnityEngine;
using System.Collections;

public class BrickParent : MonoBehaviour
{
    public float speedRate = 0.2f;

    private Brick[] _bricks;
    private bool collideLeft;
    private bool collideRight;
    private BricksManager _bricksManager;
    private bool _blockShifted;
    private bool _enableToRotate;

    void Start ()
	{
	    _bricks = GetComponentsInChildren<Brick>();
        _bricksManager = GameObject.FindObjectOfType<BricksManager>();
        StartMoving();
        if (transform.name == "Brick_3(Clone)")
        {
            _enableToRotate = false;
        }
        else
        {
            _enableToRotate = true;
        }
    }
    public void MoveRight()
    {
        for (int i = 0; i < 4; ++i)
        {
            if (_bricks[i].GetRightCollision())
            {
                return;
            }
        }
        transform.position += new Vector3(1,0);
    }

    public void MoveLeft()
    {
        for (int i = 0; i < 4; ++i)
        {
            if (_bricks[i].GetLeftCollision())
            {
                return;
            }
        }
        transform.position += new Vector3(-1,0);

    }

    public void Rotate()
    {
        if (!_enableToRotate)
        {
            return;
        }

        transform.Rotate(0,0,90);
    }

    private void MoveDown()
    {

        for (int i = 0; i < 4; ++i)
        {
            if (_bricks[i].GetBottomCollision())
            {
                if (_bricksManager != null)
                {
                    _bricksManager.SpawnBrick();
                    _bricksManager = null;
                    for (int j = 0; j < 4; ++j)
                    {
                        _bricks[j].SetTrigger(true);
                        _bricks[j].SetLayer();
                        _bricks[j].AddItself();
                    }
                }
                LinesManager.CheckCompleteLine();
                return;
            }
        }
        transform.position += new Vector3(0, -1, 0);
        Invoke("MoveDown", 1f);

    }

    public void StopMoving()
    {
        StartCoroutine(StopMove());
        
    }

    private IEnumerator StopMove()
    {
        yield return new WaitForSeconds(speedRate);
        bool botCollision = false;
        for (int i = 0; i < 4; ++i)
        {
            if (_bricks[i].GetBottomCollision() )
            {
                botCollision = true;
            }
        }
        if (!botCollision)
        {
            yield break;

        }
        CancelInvoke("MoveDown");

        for (int i = 0; i < 4; ++i)
        {
            _bricks[i].SetLayer();
        }
        if (_bricksManager != null)
        {
            _bricksManager.SpawnBrick();
            _bricksManager = null;
            for (int i = 0; i < 4; ++i)
            {
                _bricks[i].SetTrigger(true);
            }
        }
    }
    public void StartMoving()
    {
        Invoke("MoveDown",0);
    }

    public void SpeedDown()
    {
        transform.position += new Vector3(0f,-3f,0f);
    }
}
