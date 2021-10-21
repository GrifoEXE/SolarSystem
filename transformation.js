class Transformations extends LinearAlgebra
{
    

    //Translação
    translate2D(vector, dx, dy) 
    {
        let la = new LinearAlgebra();
        let v = new Vector (3,[vector.get(1), vector.get(2), 1]);
        let e = new Matrix (3,3)
        e.set(1,1, 1)
        e.set(2,2, 1)
        e.set(3,3, 1)
        e.set(1,3, dx)
        e.set(2,3, dy)

        let d = la.dot(e, v);
        
        let u = new Vector(2,[d.get(1,1), d.get(2,1)])
        return u;
    }
    
    translate3D(vector, dx, dy, dz) 
    {
        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(1,1, 1)
        e.set(2,2, 1)
        e.set(3,3, 1)
        e.set(4,4, 1)
        e.set(1,4, dx)
        e.set(2,4, dy)
        e.set(3,4, dz)

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }

    //Rotação
    rotation2D(vector, angle)
    {   
        if (angle < 0 || angle > (2 * Math.PI))
        {
            throw new Error("O ângulo deve ser em radiantes")
        }

        let la = new LinearAlgebra();
        let v = new Vector (3,[vector.get(1), vector.get(2), 1]);
        let e = new Matrix (3,3)
        e.set(1,1, Math.cos(angle));
        e.set (1,2, (- Math.sin(angle)));
        e.set (2,1, Math.sin(angle));
        e.set (2,2, Math.cos(angle));
        e.set(3,3, 1);

        let d = la.dot(e, v);
        
        let u = new Vector(2,[d.get(1,1), d.get(2,1)])
        return u;
    }
    rotation3DX(vector, angle)
    {
        if (angle < 0 || angle > (2 * Math.PI))
        {
            throw new Error("O ângulo deve ser em radiantes")
        }

        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(1,1, 1)
        e.set(2,2, Math.cos(angle));
        e.set (2,3, (- Math.sin(angle)));
        e.set (3,2, Math.sin(angle));
        e.set (3,3, Math.cos(angle));
        e.set(4,4, 1);

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }
    rotation3DY(vector, angle)
    {
        if (angle < 0 || angle > (2 * Math.PI))
        {
            throw new Error("O ângulo deve ser em radiantes")
        }

        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(1,1, Math.cos(angle))
        e.set(1,3, Math.sin(angle));
        e.set (2,2, 1);
        e.set (3,1, (-Math.sin(angle)));
        e.set (3,3, Math.cos(angle));
        e.set(4,4, 1);

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }
    rotation3DZ(vector, angle)
    {
        if (angle < 0 || angle > (2 * Math.PI))
        {
            throw new Error("O ângulo deve ser em radiantes")
        }

        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(1,1, Math.cos(angle))
        e.set(1,2, (-Math.sin(angle)))
        e.set(2,1, Math.sin(angle))
        e.set(2,2, Math.cos(angle))
        e.set(3,3, 1)
        e.set(4,4, 1);

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }

    //Reflexão
    reflection2DX(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (3,[vector.get(1), vector.get(2), 1]);
        let e = new Matrix (3,3)
        e.set(1,1,-1)//inverte X
        e.set(2,2, 1)
        e.set(3,3, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(2,[d.get(1,1), d.get(2,1)])
        return u;
    }
    reflection2DY(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (3,[vector.get(1), vector.get(2), 1]);
        let e = new Matrix (3,3)
        e.set(1,1, 1)
        e.set(2,2,-1)//inverte Y
        e.set(3,3, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(2,[d.get(1,1), d.get(2,1)])
        return u;
    }
    reflection3DX(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(1,1,-1)//inverte X
        e.set(2,2, 1)
        e.set(3,3, 1)
        e.set(4,4, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }
    reflection3DY(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(1,1, 1)
        e.set(2,2,-1)//inverte Y
        e.set(3,3, 1)
        e.set(4,4, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }
    reflection3DZ(vector) 
    {
        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(1,1, 1)
        e.set(2,2, 1)
        e.set(3,3,-1) //inverte Z
        e.set(4,4, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }

    //Projeção
    projection2DX(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (3,[vector.get(1), vector.get(2), 1]);
        let e = new Matrix (3,3)
        e.set(1,1, 1)
        e.set(3,3, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(2,[d.get(1,1), d.get(2,1)])
        return u;
    }
    projection2DY(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (3,[vector.get(1), vector.get(2), 1]);
        let e = new Matrix (3,3)
        e.set(2,2, 1)
        e.set(3,3, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(2,[d.get(1,1), d.get(2,1)])
        return u;
    }
    projection3DX(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(1,1, 1)
        e.set(4,4, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }
    projection3DY(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(2,2, 1)
        e.set(4,4, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }
    projection3DZ(vector)
    {
        let la = new LinearAlgebra();
        let v = new Vector (4,[vector.get(1), vector.get(2), vector.get(3), 1]);
        let e = new Matrix (4,4)
        e.set(3,3, 1)
        e.set(4,4, 1)

        let d = la.dot(e, v);
        
        let u = new Vector(3,[d.get(1,1), d.get(2,1), d.get(3,1)])
        return u;
    }

    //Cisalhamento
    shearing2D(vector, kx, ky) // (x,y) = (x+ ky,y) e (x, y+kx)
    {
        let la = new LinearAlgebra();
        let v = new Vector (3,[vector.get(1), vector.get(2), 1]);
        let e = new Matrix (3,3)
        e.set(1,1, 1)
        e.set (2,2, 1)
        e.set(1,2, ky)
        e.set(2,1, kx)
        e.set(3,3, 1)
        let d = la.dot(e, v);
        
        let u = new Vector(2,[d.get(1,1), d.get(2,1)])
        return u;
    }
}


