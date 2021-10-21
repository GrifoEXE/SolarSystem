class LinearAlgebra
{
    transpose(a)// função para transpor matrizes
    {
        let c;
        if(a instanceof Matrix)
        {
            c = new Matrix (a.cols, a.rows)

            for (let i = 1; i <=c.rows; i++)
            {
                for (let j = 1; j <=c.cols; j++)
                {
                    c.set(i, j, a.get(j, i))
                }
            }
        }
        return c
    }

    // Função de soma de matrizes e vetores
    sum (a, b)
    {
        if (!a instanceof Matrix || !b instanceof Matrix)
        {
            throw new Error("Os parâmetros devem ser objetos da classe Vector e Matrix.")
        }
        if (a.rows != b.rows || a.cols != b.cols)
        {
            throw new Error("As matrizes não possuem as mesmas dimensões")
        }

        let c;

        if (a instanceof Vector && b instanceof Vector)
        {
            c = new Vector(a.dim)
            c.rows = a.rows
            c.cols = a.cols

            for (let i = 1; i <= a.dim; i++)
            {
                c.set(i, a.get(i) + b.get(i))
            
            }
        } 
        else if (a instanceof Matrix && b instanceof Matrix)
        {
        // Verificação se as duas entradas tem o mesmo tamanho
        
            c = new Matrix(a.rows, a.cols)

        for (let i = 1; i <= a.rows; i++)
        {
            for(let j = 1; j <= a.cols; j++)
            {
                c.set(i, j, a.get(i, j) + b.get(i, j))
            }
        }
        }
        else
        {
            throw new Error("Os parâmetros devem ser objetos da classe Vector e Matrix.")
        }

        return c
    }
    // Função de multiplicação de elemento a elemento de matrizes e vetores
    times (a, b)
    {
        let c;
        //Multiplicação por um numero escalar
        if (typeof (a) == "number")
        {
            if (!b instanceof Matrix)
            {
                throw new Error("O parâmetro b deve ser um objeto da classe Matrix ou Vector")
            }
            if (b instanceof Vector)
            {
                c = new Vector(b.dim)
                c.rows = b.rows
                c.cols = b.cols
                
                for (let i = 1; i <= b.dim; i++)
                {
                    c.set(i, a * b.get(i))
                
                }
            }
            else if (b instanceof Matrix)
            {
                c = new Matrix(b.rows, b.cols)

                for (let i = 1; i <= b.rows; i++)
                {
                    for(let j = 1; j <= b.cols; j++)
                    {
                        c.set(i, j, a * b.get(i, j))
                    }
                }
                }
                else
                {
                    throw new Error("Os parâmetros devem ser objetos da classe Vector e Matrix.")
                }
        }   
        else
        {
            if (!a instanceof Matrix || !b instanceof Matrix)
            {
                throw new Error("Os parâmetros devem ser objetos da classe Vector e Matrix.")
            }
            if (a.rows != b.rows || a.cols != b.cols)
            {
                throw new Error("As matrizes não possuem as mesmas dimensões")
            }

            if (a instanceof Vector && b instanceof Vector)
            {
                c = new Vector(a.dim)
                c.rows = a.rows
                c.cols = a.cols

                for (let i = 1; i <= a.dim; i++)
                {
                    c.set(i, a.get(i) * b.get(i))
                
                }
            } 
            else if (a instanceof Matrix && b instanceof Matrix)
            {
            // Verificação se as duas entradas tem o mesmo tamanho
            
                c = new Matrix(a.rows, a.cols)

            for (let i = 1; i <= a.rows; i++)
            {
                for(let j = 1; j <= a.cols; j++)
                {
                    c.set(i, j, a.get(i, j) * b.get(i, j))
                }
            }
            }
            else
            {
                throw new Error("Ambos os parâmetros devem ser objetos da classe Vector ou da classe Matrix ou um numero e um objeto da classe Matrix.")
            }
            return c;
        }
    }

    dot (a, b) 
    {

        if (!(a instanceof Matrix) || !(b instanceof Matrix))
        {
            throw new Error("Os parâmetros devem ser objetos da classe Vector e Matrix.")
        }
        if (a.cols != b.rows)
        {
            throw new Error("A quantidade de colunas da matriz A não é igual a quantidade de linhas da matriz B")
        }

        let c;
        
        if (a instanceof Vector && b instanceof Vector)
        {   
            c = 0;
                for (let i = 1; i <= a.dim; i++)
                {
                    c = c + a.get(i) * b.get (i);
                }
        }
        else
        {
            c = new Matrix(a.rows, b.cols)
            for (let i = 1; i <= a.rows; i++)
            {
                for (let j = 1; j <= b.cols; j++)
                {
                    for (let k = 1; k <= a.cols; k++)
                    {
                        c.set (i, j, c.get(i, j) + a.get (i, k) * b.get(k, j))
                    }
                }
            }
        }
        return c;

    }
    
    
    
    gauss(a)//Realizar eliminação gaussiana em uma Matriz. Recebe como entrada um objeto da classe Matrix e retorna a matriz resultante da operação de eliminação gaussiana.
    {
        if(a instanceof Vector)
        {
            throw new Error("A entrada (a) não pode ser um objeto da Classe Vector.");
        }

        if(!(a instanceof Matrix)) 
        {
            throw new Error("A entrada (a) deve ser um objeto da classe Matrix.");
        }

        if(a.rows < 2 || a.cols < 2) 
        {
            throw new Error("A matriz (a) precisa ter no mínimo duas linhas e duas colunas.");
        }

        let c = new Matrix (a.rows, a.cols)
        for (let i = 1; i <= a.rows; i++)
        {
            for(let j = 1; j <= a.cols; j++)
            {
                c.set(i, j, a.get(i, j))
            }
        }

        let pivot;//pivot
        let suporte;
        let t;//troca

        for(let p = 1; p <= c.rows && p <= c.cols-1; p++)//Determinar pivot e numero de vezes que o pivot mudará de valor
        {
            pivot = Math.abs(c.get(p,p))//Modular para realizar comparações com elementos abaixo
            suporte = p

            for(let y = p + 1; y <= c.rows; y++)//Comparar elementos dentro da coluna p do pivot e faz o pivot ser o maior
            {
                if (pivot < Math.abs(c.get(y,p)))
                {
                    pivot = Math.abs(c.get(y,p))
                    suporte = y
                }
            }

            for(let x = 1; x <= c.cols; x++)//Trocar elementos de cada linha por coluna
            {
                t = c.get(p,x);
                c.set(p, x, c.get(suporte,x));
                c.set(suporte, x, t);
            }

            for(let i = p + 1; i <= c.rows; i++)
            {
                let k = (-1 *c.get(i,p))/ c.get(p,p)//cálculo da constante k
                
                for (let j = 1; j <= c.cols; j++)
                {
                    c.set(i, j, (k*(c.get(p,j)) + c.get(i,j))) //cálculo da nova linha após a terceira operação elementar
                }
            }
        }
        return c;

    }
    
    solve (a)//Realizar eliminação gauss-jordan em uma Matriz. Recebe como entrada um objeto da classe Matrix e retorna a matriz resultante da operação de Gauss-Jordan.
    {
        if(a instanceof Vector)
        {
            throw new Error("A entrada (a) não pode ser um objeto da Classe Vector.");
        }

        if(!(a instanceof Matrix)) 
        {
            throw new Error("A entrada (a) deve ser um objeto da classe Matrix.");
        }

        if(a.rows < 2 || a.cols < 2) 
        {
            throw new Error("A matriz (a) precisa ter no mínimo duas linhas e duas colunas.");
        }

        let c = new Matrix (a.rows, a.cols)
        for (let i = 1; i <= a.rows; i++)
        {
            for(let j = 1; j <= a.cols; j++)
            {
                c.set(i, j, a.get(i, j))
            }
        }

        let pivot;//
        let suporte;//
        let t;//
        
        //Primeiro Passo: Realizar Eliminação gaussiana para zerar a triangular inferior
        for(let p = 1; p <= c.rows && p <= c.cols-1; p++)
        {
            pivot = Math.abs(c.get(p,p))
            suporte = p

            for(let y = p + 1; y <= c.rows; y++)
            {
                if (pivot < Math.abs(c.get(y,p)))
                {
                    pivot = Math.abs(c.get(y,p))
                    suporte = y
                }
            }

            for(let x = 1; x <= c.cols; x++)
            {
                t = c.get(p,x);
                c.set(p, x, c.get(suporte,x));
                c.set(suporte, x, t);
            }

            for(let i = p + 1; i <= c.rows; i++)
            {
                let k = (-1 *c.get(i,p))/ c.get(p,p)
                
                for (let j = 1; j <= c.cols; j++)
                {
                    c.set(i, j, (k*(c.get(p,j)) + c.get(i,j)))
                }
            }
        }

        //Segundo Passo: Retropropagação para zerar a triangular superior

        for(let p = c.rows && c.cols-1; p >= 1; p--)
        {
            pivot = Math.abs(c.get(p,p))
            suporte = p

            for(let y = p - 1; y >= 1; y--)
            {
                if (pivot < Math.abs(c.get(y,p)))
                {
                    pivot = Math.abs(c.get(y,p))
                    suporte = y
                }
            }
            
            for(let x = 1; x <= c.cols; x++)//Trocar elementos de cada linha por coluna
            {
                t = c.get(p,x);
                c.set(p, x, c.get(suporte,x));
                c.set(suporte, x, t);
            }

            for(let i = p - 1; i >= 1; i--)
            {
                let k = (-1 *c.get(i,p))/ c.get(p,p)
                
                for (let j = c.cols; j >= 1; j--)
                {
                    c.set(i, j, (k*(c.get(p,j)) + c.get(i,j)))
                }
            }
        }

        //Terceiro Passo: Tornar todos os pivots em 1 usando a primeira operação elementar
        for(let i = 1; i <= c.rows; i++)
        {
            let pivot = c.get(i,i) 
            for(let j = 1; j <= c.cols; j++)
            {
                c.set(i, j, c.get(i, j) / pivot)
            }

        }


        
        return c;
    }
    det (a) // Essa função deve receber uma matriz quadrada e calcular o determinante da matriz utilizando a eliminação gaussiana, como mostrado nas aulas anteriores. Deve-se retornar o valor do determinante;

    {
        if(a instanceof Vector)
        {
            throw new Error("A entrada (a) não pode ser um objeto da Classe Vector.");
        }

        if(!(a instanceof Matrix)) 
        {
            throw new Error("A entrada (a) deve ser um objeto da classe Matrix.");
        }

        if(a.rows < 2 || a.cols < 2) 
        {
            throw new Error("A matriz (a) precisa ter no mínimo duas linhas e duas colunas.");
        }
        
        if(a.rows != a.cols) 
        {
            throw new Error("A matriz (a) precisa ser quadrada, ou seja, ter n linhas e n colunas");
        }

        let c = new Matrix (a.rows, a.cols)
        for (let i = 1; i <= a.rows; i++)
        {
            for(let j = 1; j <= a.cols; j++)
            {
                c.set(i, j, a.get(i, j))
            }
        }

        let pivot;//pivot
        let suporte;
        let t;//troca

        for(let p = 1; p <= c.rows && p <= c.cols; p++)//Determinar pivot e numero de vezes que o pivot mudará de valor
        {
            pivot = Math.abs(c.get(p,p))//Modular para realizar comparações com elementos abaixo
            suporte = p

            for(let y = p + 1; y <= c.rows; y++)//Comparar elementos dentro da coluna p do pivot e faz o pivot ser o maior
            {
                if (pivot < Math.abs(c.get(y,p)))
                {
                    pivot = Math.abs(c.get(y,p))
                    suporte = y
                }
            }

            for(let x = 1; x <= c.cols; x++)//Trocar elementos de cada linha por coluna
            {
                t = c.get(p,x);
                c.set(p, x, c.get(suporte,x));
                c.set(suporte, x, t);
            }

            for(let i = p + 1; i <= c.rows; i++)
            {
                let k = (-1 *c.get(i,p))/ c.get(p,p)//cálculo da constante k
                
                for (let j = 1; j <= c.cols; j++)
                {
                    c.set(i, j, (k*(c.get(p,j)) + c.get(i,j))) //cálculo da nova linha após a terceira operação elementar
                }
            }
        }

        let D = 1
        for (let i = 1; i <= c.rows; i++)
        {
            for(let j = 1; j <= c.cols; j++)
            {
                D = D * c.get(i,i)
            }
        }

        return D;
        
    }
    //este método falhou
    invFail(a) // recebe uma matriz quadrada e retorna a matriz inversa // se a determinante da matriz for maior que 0, ela tem inversa
    {
        if(a instanceof Vector)
        {
            throw new Error("A entrada (a) não pode ser um objeto da Classe Vector.");
        }

        if(!(a instanceof Matrix)) 
        {
            throw new Error("A entrada (a) deve ser um objeto da classe Matrix.");
        }

        if(a.rows < 2 || a.cols < 2) 
        {
            throw new Error("A matriz (a) precisa ter no mínimo duas linhas e duas colunas.");
        }

        let c = new Matrix (a.rows, 2*a.cols)
        for (let i = 1; i <= a.rows; i++)
        {
            for(let j = 1; j <= a.cols; j++)
            {
                c.set(i, j, a.get(i, j))
            }
            for(let y = a.cols+1; y < 2*a.cols; y++)
            {
                
                    c.set(i, (i+a.rows), 1)
            }
        }
        let pivot;//
        let suporte;//
        let t;//
        
        //Primeiro Passo: Realizar Eliminação gaussiana para zerar a triangular inferior
        for(let p = 1;p <= c.rows; p++)
        {
            pivot = Math.abs(c.get(p,p))
            suporte = p

            for(let y = p + 1; y <= c.rows; y++)
            {
                if (pivot < Math.abs(c.get(y,p)))
                {
                    pivot = Math.abs(c.get(y,p))
                    suporte = y
                }
            }

            for(let x = 1; x <= c.cols; x++)
            {
                t = c.get(p,x);
                c.set(p, x, c.get(suporte,x));
                c.set(suporte, x, t);
            }

            for(let i = p + 1; i <= c.rows; i++)
            {
                let k = (-1 *c.get(i,p))/ c.get(p,p)
                
                for (let j = 1; j <= c.cols; j++)
                {
                    c.set(i, j, (k*(c.get(p,j)) + c.get(i,j)))
                }
            }
        }
        //Segundo Passo: Retropropagação para zerar a triangular superior

        for(let p = c.rows; p >= 1; p--)
        {
            pivot = Math.abs(c.get(p,p))
            suporte = p

            for(let y = p - 1; y >= 1; y--)
            {
                if (pivot < Math.abs(c.get(y,p)))
                {
                    pivot = Math.abs(c.get(y,p))
                    suporte = y
                }
            }
            
            for(let x = c.cols; x >=1 ; x--)//Trocar elementos de cada linha por coluna
            {
                t = c.get(p,x);
                c.set(p, x, c.get(suporte,x));
                c.set(suporte, x, t);
            }

            for(let i = p-1; i >= 1; i--)
            {
                let k = (-1 *(c.get(i,p)))/ c.get(p,p)
                
                for (let j = c.cols; j >= 1; j--)
                {
                    c.set(i, j, (k*(c.get(p,j)) + c.get(i,j)))
                }
            }
        }
        //Terceiro Passo: Tornar todos os pivots em 1 usando a primeira operação elementar
        for(let i = 1; i <= c.rows; i++)
        {
            let pivot = c.get(i,i) 
            for(let j = 1; j <= c.cols; j++)
            {
                c.set(i, j, c.get(i, j) / pivot)
            }

        }

        return c;
    }

    //Este método funcionou
    inv(a) // recebe como entrada uma matriz quadrada, utiliza eliminação gaussiana para retornar a matriz inversa
    {
        if(a instanceof Vector)
        {
            throw new Error("A entrada (a) não pode ser um objeto da Classe Vector.");
        }

        if(!(a instanceof Matrix)) 
        {
            throw new Error("A entrada (a) deve ser um objeto da classe Matrix.");
        }

        if(a.rows < 2 || a.cols < 2) 
        {
            throw new Error("A matriz (a) precisa ter no mínimo duas linhas e duas colunas.");
        }

    // Passos:
    // (1) Criar 2 matrizes: I é a matriz Identidade e C é a cópia da matriz entrada
    // (2) Transformar a matriz C na matriz Identidade através da eliminação Gaussiana
    // (3) A matriz I se torna na matriz Inversa da matriz entrada
    // (4) Tornar a Matriz I em um objeto da classe Matrix
    
    
    //Criar 2 matrizes: I é a matriz Identidade e C é a cópia da matriz entrada
    let i=1, ii=1, j=1, dim = a.cols, pivot = 0;
    let I = [] , C = [];
    for(i=0; i<dim; i++)
    {   
        I[I.length]=[];
        C[C.length]=[];
        for(j=0; j<dim; j++)
        {
            
            //fazer a matriz identidade
            if(i==j)
            { 
                I[i][j] = 1; 
            }
            else
            { 
                I[i][j] = 0; 
            }
            // fazer uma cópia da matriz original 
            for(let x = 1; x <=dim; x++)
            {
                for(let y = 1; y<=dim; y++)
                {
                    //Como a primeira posição do objeto Matrix é 1, fazer com que a posição desejada seja i+1 e j+1 (equivalente à [i][j])
                    C[i][j] = a.get(i+1, j+1);
                }
            }
        }
    }
    
    //Transformar a matriz C na matriz Identidade através da eliminação Gaussiana
    for(i=0; i<dim; i++)
    {
        // declarar o pivot da linha
        pivot = C[i][i];
        
        // se o pivot da linha for ZERO, é necessário trocar a linha pela inferior
        if(pivot==0)
        {
            // percorrer todas as linhas abaixo da linha i
            for(ii=i+1; ii<dim; ii++)
            {
                // se a linha ii da matriz cópia(C) não possui um ZERO na coluna i(pivot)
                if(C[ii][i] != 0)
                {
                    // faz o pivot não ter um ZERO ao trocar a linha
                    for(j=0; j<dim; j++)
                    {
                        pivot = C[i][j];       //temporariamente guardar a linha i da matriz Cópia(C)
                        C[i][j] = C[ii][j];    //trocar linha i pela linha ii da matriz Cópia(C)
                        C[ii][j] = pivot;      //trocar linha ii pela linha i temporariamente guardada da matriz Cópia(C)
                        pivot = I[i][j];       //temporariamente guardar a linha i da matriz Identidade(I)
                        I[i][j] = I[ii][j];    //trocar linha i pela linha ii da matriz Identidade(I)
                        I[ii][j] = pivot;      //trocar linha ii pela linha i temporariamente guardada da matriz Identidade(I)
                    }
                    //parar de checar pois já foi feita a troca
                    break;
                }
            }
            //declarar o novo pivot
            pivot = C[i][i];
            // se pivot ainda for zero, a determinante fica zero, tornando o processo de inverter impossível
            if (pivot == 0)
            {
                throw new Error ("Esta matriz é irrevertível (sua determinante é ZERO)")
            }
        }
        
        // dividir as linhas pelo pivot para torná-los em 1 (em ambas matrizes)
        for(j=0; j<dim; j++)
        {
            C[i][j] = C[i][j]/pivot; //para matriz Cópia
            I[i][j] = I[i][j]/pivot; //para matriz Identidade
        }
        
        /* 
        Subtrair a linha ii (apropriadamente dividida pelo pivot por cada linha) por todas as outras linhas.
        Isso é feito para que tenham apenas zeros na coluna nas linhas acima 
        e abaixo da linha presente
        */
        for(ii=0; ii<dim; ii++)
        {
            // exclui posições dos pivots
            if(ii==i)
            {
                continue;
            }
            // declarar posição que será zerada
            let k = C[ii][i];
            /*
            Subtrair a linha abaixo (ou acima) dividida pelo pivot pela linha presente
            porém começar pela coluna i, já que todas as posições à esquerda da diagonal 
            principal serão ZERO devido à eliminação gaussiana.
            */
            for(j=0; j<dim; j++)
            {
                C[ii][j] -= k*C[i][j]; 
                I[ii][j] -= k*I[i][j]; 
            }
        }
    }
    
    // Agora a matriz C é a matriz Identidade e a matriz I é a Matriz Inversa!
    
    //Tornar a matriz I em um objeto da classe Matrix
    let inversa = new Matrix(dim, dim)

    for (let i = 0; i < dim; i++)
    {
        for (let j = 0; j < dim; j++)
        {
            for(let x = 1; x <=dim; x++)
            {
                for(let y = 1; y<=dim; y++)
                {
                    inversa.set(i+1, j+1, I[i][j]);
                }
            }
        }
    }
    
    return inversa;
    
    }
}