using UnityEngine;
using System.Collections;
using System.Collections.Generic;


public class Brick : MonoBehaviour
{
    private BoxCollider2D _boxCollider;
    private List<Transform> _colliderList;
    private int _collidersInterator;
    private BrickParent _parentBrick;
    private int layer;

    void Start ()
	{
        _boxCollider = GetComponent<BoxCollider2D>();
        _parentBrick = GetComponentInParent<BrickParent>();
        _colliderList = new List<Transform>(8);
        _collidersInterator = 0;
        GetComponent<SpriteRenderer>().color = new Color(Random.Range(0f, 1f), Random.Range(0f, 1f), Random.Range(0f, 1f));
    }
	
   
    public bool GetRightCollision()
    {
        int _length = _colliderList.Count;
        for (int i = 0; i < _length; ++i)
        {
            if (_colliderList[i].name == "Wall_Right" && transform.position.x + 1 == _colliderList[i].position.x)
            {
                return true;
            }
            if (Vector3.Distance(transform.position, _colliderList[i].position) > 1.1f)
            {
                continue;
            }
            
            if (Mathf.Round(transform.position.y) == Mathf.Round(_colliderList[i].position.y) &&
                Mathf.Round(transform.position.x) + 1 == Mathf.Round(_colliderList[i].position.x))
            {
                return true;
            }
        }
        return false;
    }
    public bool GetLeftCollision()
    {
        int _length = _colliderList.Count;
        for (int i = 0; i < _length; ++i)
        {
            if (_colliderList[i].name == "Wall_Left" && transform.position.x-1 == _colliderList[i].position.x)
            {
                return true;
            }
            if (  Vector3.Distance(transform.position, _colliderList[i].position) >1.1f)
            {
                continue;
            }
            
            if (Mathf.Round(transform.position.y) == Mathf.Round(_colliderList[i].position.y) &&
                Mathf.Round(transform.position.x) - 1 == Mathf.Round(_colliderList[i].position.x))
            {
                return true;
            }
        }
        return false;
    }
    public bool GetBottomCollision()
    {
        int _length = _colliderList.Count;
        for (int i = 0; i < _length; ++i)
        {
            if (_colliderList[i].name == "Wall_Bottom" )
            {
                return true;
            }
            if (Vector3.Distance(transform.position, _colliderList[i].position) > 1.1f)
            {
                continue;
            }
            
            if (Mathf.Round(transform.position.y) -1 == Mathf.Round(_colliderList[i].position.y) &&
                Mathf.Round(transform.position.x) == Mathf.Round(_colliderList[i].position.x))
            {
                return true;
            }
        }
        return false;
    }
    public void WallCollisions()
    {
        int _length = _colliderList.Count;
        for (int i = 0; i < _length; ++i)
        {
            if (transform.position.x == _colliderList[i].position.x)
            {
                if (transform.position.x < 0)
                {
                    transform.parent.transform.position += new Vector3(1f, 0);
                }
                else
                {
                    transform.parent.transform.position += new Vector3(-1f, 0);

                }
            }

        }
    }
    public void SetTrigger(bool trigger)
    {
        _boxCollider.isTrigger = trigger;
    }
    public void SetLayer()
    {
        layer = (int)transform.position.y;
    }
    public void AddItself()
    {
        LinesManager.AddElement(layer, this);
    }

    private void OnTriggerStay2D(Collider2D collider)
    {
        AddCollider(collider);
    }
    private void OnTriggerEnter2D(Collider2D collider)
    {
        AddCollider(collider);
    }

    private void AddCollider(Collider2D collider)
    {
        if (transform.parent == collider.transform.parent /*|| collider.transform.name == "Playfield"*/)
        {
            return;
        }
        _colliderList.Insert(_collidersInterator, collider.transform);
        _collidersInterator++;
        if (_collidersInterator >= 7)
        {
            _collidersInterator = 0;
        }
    }
    

    
}

