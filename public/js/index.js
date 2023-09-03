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
    const preenchidos = inputs.get().every(({value}) => value)
    $('button').prop('disabled', !preenchidos);
}

$("#gerar-pll").click(function () {

    let num_var = document.getElementById("input-var").value;
    let restr_var = document.getElementById("input-restr").value;
    var ch = $("#radio-form input[type='radio']:checked").val();

    var i = 0, j = 0;
    coluna = "";
    newTeste = "";

    newRowAdd = '<br><label for="var-decisao">Variavéis de Decisão</label><br />';
    newRowAddFo = '<br><label for="func-obj">Função-objetivo</label><br />' + 
    '<div class="row"><div class="col col-md-2"><div style="font-weight:bold; text-align: center; align-items: center;">' + ch.toUpperCase() + ' Z' + '</div></div>';
    newTeste = '<br><label for="restricao">Restrições</label><br />';

    for(i = 0; i < parseInt(num_var); i++)
    {
        newRowAdd +=
        '<div class="row"><div class="col col-md-8"> <div class="input-group">' +
        '<input type="text" class="form-control m-input"> </div> </div></div>';

        newRowAddFo +=
        '<div class="col col-md-2"> <div class="input-group">' +
        '<input type="text" id="fo-' + i +'" class="form-control m-input"> </div> </div>';
    
        newTeste += '<div class="row" id="row-0' + i +'">';// + coluna+ '</div>';

        for(j = 0; j <= parseInt(restr_var); j++){

            //if(cont < 3)
            //variaveis
            if(j == parseInt(restr_var)){

                coluna += '<div class="col"> <select class="form-control" id="select-fo-0'+ i + '">' +
                '<option><=</option><option>>=</option><option>=</option>' +
                '</select></div>'+
                '<div class="col"> <div class="input-group">' +
                '<input type="text" id="col-fo-0' + i + j+ '" class="form-control m-input"> </div> </div>';

            }else{
                coluna += '<div class="col"> <div class="input-group">' +
                '<input type="text" id="col-fo-0' + i + j + '" class="form-control m-input"> </div> </div>';
            }
            
        }

        newTeste += coluna + '</div>';
        $('#lista-restricoes').append(newTeste);
        coluna="";
        newTeste="";
        
    }
    
    $('#newinput').append(newRowAdd);

    newRowAddFo+='</div>';

    $('#input-fo').append(newRowAddFo);

    buttonDualGerador = '<div class="row"><div class="col">' +
    '<button id="gerar-dual" type="button" class="btn btn-red">' +
    'Dual</button></div> </div>';

    $('#dual-btn').append(buttonDualGerador);

});
// $("body").on("click", "#DeleteRow", function () {
//     $(this).parents(".row").remove();
// });

// <div class="col"><button class="btn btn-danger" id="DeleteRow" type="button">' +
//         '<i class="bi bi-trash"></i> Delete</button></div></div>'

$("#dual-btn").on("click","#gerar-dual" ,function () {

    // let num_var = document.getElementById("fo").value;
    // var value_checked = $("input:radio:checked").text();
    // var ch = $("#radio-form input[type='radio']:checked").val();
    let num_var = document.getElementById("input-var").value;
    let restr_var = document.getElementById("input-restr").value;
    var ch = $("#radio-form input[type='radio']:checked").val();
    var selectDesig = "";

    if(ch === "max")
    {
        ch= "MIN";
    }else
    {
        ch = 'MAX';
    }

    // ultima coluna de restrições em todas as linhas
    var preenchT = "";
    preenchRest = "";
    preenchRestFinal = "";
    gerarDualBTN = "";

    // IMPORTANTE: substituir o numero 3, pois se trata do numero de variaveis
    for(i = 0; i < parseInt(num_var); i++){

        //let alok = document.getElementById("#col-fo-003").value;
        var alok = $('#col-fo-0'+ i + parseInt(restr_var)).val();
        
        preenchT += alok + 'y' + (i+1);

        if( i < parseInt(num_var)-1){
            preenchT+=  ' + ';
        }

    }

    gerarDualBTN +=
    '<div class="row"> <div class="col">' +
    '<p> Função-Objetivo: ' + ch + ' W = ' + preenchT + '</p></div></div>';
    
    gerarDualBTN+= 
    '<div class="row"> <div class="col">' +
    '<p> Restrições </p></div></div>';

    selectFinal = [];
    var cert = 0;
    var ind = [];
    var cod;
    for(i = 0; i < parseInt(num_var); i++){

        //<= MAX
        //>= MIN
        // = depende

        selectDesig = $('#select-fo-0'+i).find(":selected").text();

        if(ch === "MAX" && selectDesig === "<=")
        {
            cert = 1;
            ind.push(i);
            cod = ' >= ';

        }else if(ch === "MIN" && selectDesig === ">="){
        
            cert = 1;
            ind.push(i);
            cod = ' <= ';
        }
    }
     //alert(selectFinal);
    
     // adição da desigualdade e reforço
   // cont = parseInt(num_var);
    for(i = 0; i < parseInt(restr_var); i++){

        preenchRest = '<div class="row"> <div class="col">';
        
        
        for(j = 0; j < parseInt(num_var); j++){
            // 4 5 6 >= 5
            // 7 8 9 >= 2
            selectDesig = $('#select-fo-0'+j).find(":selected").text();

             
            if(ch === "MAX" && selectDesig === ">="){
                cod = ' <= ';
            }else if(ch === "MIN" && selectDesig === "<="){
                cod = ' >= ';
            }else if(selectDesig === "="){
                if(ch === "MAX")
                    cod = ' <= ';
                else
                    cod = ' >= ';
            }
        

            // se tiver alguma variavel que precisa ser negativa
            for(k = 0; k < ind.length; k++){
                if(cert === 1 && j === ind[k]){
                    preenchRest += ($('#col-fo-0'+ j + i).val()*-1) + 'y' + (j+1) + ' ';
                    j++;
                }
            }

            // iteração de j - passa para proxima linha
            if(j !== parseInt(num_var)){
                preenchRest += $('#col-fo-0'+ j + i).val() + 'y' + (j+1);
            }
            
           
            if( j < parseInt(num_var) - 1){
                preenchRest+=  ' + ';
            }

        }


        preenchRest += cod + $('#fo-' + i).val() +'</div></div>';


        preenchRestFinal +=preenchRest ;

    }

    newRowF = '<div class="row"><div class="col">';
    for(i = 0; i < parseInt(num_var); i++){
        newRowF += 'y' + (i+1);

        if(i < parseInt(num_var) - 1){
            newRowF += ', ';
        }  
                
    }
    newRowF+= cod + ' 0</div></div>';

    gerarDualBTN+=preenchRestFinal+newRowF;

    $('#dual-saida').append(gerarDualBTN);
});

// numero de variaveis
//var
// numero de restrições
//restr
// função objetivo
//max

//min

//submit - gerar
//btn-submit