/**
 * 
 * Numero de Variaveis: input-var
 * Função-Objetivo: 
 * 
 * Quantidade de Restrições: input-restr
 * 
 * Botão Gerar: gerar-pll
 */
var inputs = $('input').on('keyup', verificarInputs);

function verificarInputs() {
    const preenchidos = inputs.get().every(({ value }) => value)
    $('button').prop('disabled', !preenchidos);
}

$("#gerar-pll").click(function () {

    let num_var = document.getElementById("input-var").value;
    let restr_var = document.getElementById("input-restr").value;
   // var ch = $("#radio-form input[type='radio']:checked").val();

    var i = 0, j = 0;
    coluna = "";
    newTeste = "";

    // newRowAdd = '<br><label for="var-decisao">Variavéis de Decisão</label><br />';
    // newRowAddFo = '<br><label for="func-obj">Função-objetivo</label><br />' +
    //     '<div class="row"><div class="col col-md-2"><div style="font-weight:bold; text-align: center; align-items: center;">' + ch.toUpperCase() + ' C = ' + '</div></div>';
    newTeste = '<br><br>';

    newTeste += '<div class="row">' +
                '<div class="col"><label>Item</label></div>' +
                '<div class="col"><label>Lucro</label></div>' +
                '<div class="col"><label>Peso</label></div>' +
                '</div>';

    // substitugir o item por numero - se der
    for (j = 0; j < parseInt(num_var); j++) {
        //if(cont < 3)
        //variaveis
        newTeste += '<div class="row" id="row-0' + j + '">';// + coluna+ '</div>';

        for (i = 0; i < 3; i++) {
 
            newTeste += '<div class="col" id="select-fo-0>' + j + '">' +
                '<div class="input-group">' +
                '<input type="text" id="col-fo-0' + j + i + '" class="form-control m-input"> </div> </div>';
        }
        
        newTeste += '</div>';
        
        $('#lista-restricoes').append(newTeste);
        


        newTeste="";
    }

    buttonDualGerador = '<div class="row"><div class="col">' +
        '<button id="gerar-dual" type="button" class="btn btn-red">' +
        'Solução</button></div> </div>';

    $('#dual-btn').append(buttonDualGerador);

});

// $("body").on("click", "#DeleteRow", function () {
//     $(this).parents(".row").remove();
// });

// <div class="col"><button class="btn btn-danger" id="DeleteRow" type="button">' +
//         '<i class="bi bi-trash"></i> Delete</button></div></div>'

function max(a, b)
{
      return (a > b) ? a : b;
}

// Returns the maximum value that can
// be put in a knapsack of capacity W
function knapSack(W, wt, val, n)
{
    var i, w;
    var K = new Array(n + 1);

    // Build table K[][] in bottom up manner
    for (i = 0; i <= n; i++)
    {
        K[i] = new Array(W + 1);

        for (w = 0; w <= W; w++)
        {
            if (i == 0 || w == 0){
                K[i][w] = parseInt(0);
            }else if (wt[i - 1] <= w){

                K[i][w]
                    = max(parseInt(val[i - 1])
                    + parseInt(K[i - 1][w - wt[i - 1]]),
                    parseInt(K[i - 1][w]));
            }else{
                K[i][w] = parseInt(K[i - 1][w]);
            }
        }
    }
    console.log(K);
    return K[n][W];
}

$("#dual-btn").on("click", "#gerar-dual", function () {

    let num_var = document.getElementById("input-var").value;
    let capacidade = document.getElementById("input-restr").value;

    var matriz = new Array(num_var);

    // iniciar matriz -> n linhas e 3 colunas
    for(i = 0; i < num_var; i++){  
        matriz[i] = new Array(4);
    }
    // preenchRest = "";
    // preenchRestFinal = "";
    // gerarDualBTN = "";

    // Pegar os valores por linha, ja que a coluna é predefinida
    for (i = 0; i < parseInt(num_var); i++) {
        
        var lucro = $('#col-fo-0' + i + 1).val();
        var peso = $('#col-fo-0' + i + 2).val();

        // composição -> item | lucro | peso | densidade (lucro/peso)
        matriz[i][0] = $('#col-fo-0' + i + 0).val();
        matriz[i][1] = lucro;
        matriz[i][2] = peso;
        matriz[i][3] = lucro/peso;
    }
    console.log(matriz);

    matriz.sort(sortFunction);

    function sortFunction(a, b) {
        if (a[3] === b[3]) {
            return 0;
        }
        else {
            return (a[3] > b[3]) ? -1 : 1;
        }
    }

    values = [];
    weights = [];
    capacity = capacidade;

    console.log(values);
    console.log(weights);

    for(i = 0; i < num_var;i++){
        values.push(matriz[i][1]);
        weights.push(matriz[i][2]);
    }

    //knapSack(W, wt, val, n)
    
    var sol_otima = knapSack(capacidade, weights, values, values.length);

    $('#dual-saida').append(sol_otima);
});