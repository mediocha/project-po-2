document.getElementById("bar-menu").innerHTML = "Hello JavaScript!";


function gerarPLL(msg){

    let num_var = document.getElementById("var").value;
    let num_restr = document.getElementById("restr").value;
    let value_checked = document.querySelector('input[type=radio]:checked').value;

    document.querySelector('input[type=radio]:checked').value
    
    let msga = (num_var + ' ' + ' ' + num_restr + ' ' + value_checked);

    document.getElementById("info-right").innerHTML = msga;
}

$("#rowAdder").click(function () {
    newRowAdd =
    '<div class="row"><div class="col"> <div class="input-group">' +
    '<input type="text" class="form-control m-input"> </div> </div>' +
    '<div class="col"><button class="btn btn-danger" id="DeleteRow" type="button">' +
    '<i class="bi bi-trash"></i> Delete</button></div></div>';

    $('#newinput').append(newRowAdd);
});
$("body").on("click", "#DeleteRow", function () {
    $(this).parents(".row").remove();
})

$("#rowAdderFo").click(function () {
    newRowAddFo =
    '<div class="col col-md-2"> <div class="input-group">' +
    '<input type="text" class="form-control m-input"> </div> </div>';

    $('#input-fo').append(newRowAddFo);
});

$("#fo-btn").click(function() {
    let num_var = document.getElementById("fo").value;
    
    
    // colunas antes do igual
    coluna = "";
    cont = parseInt(num_var);
    var i=0;

    // numero de variaveis
    /*for(i = 0; i < 3; i++)
    {
        coluna += '<div class="col"> <div class="input-group">' +
        '<input type="text" id="col-fo-0' + i + '" class="form-control m-input"> </div> </div>';
    
    }
    // pensar num jeito dos ids não ficarem iguais
    // select
    coluna += '<div class="col"> <select class="form-control" id="select-fo">' +
              '<option><=</option><option>>=</option>' +
              '</select></div>'+
              '<div class="col"> <div class="input-group">' +
              '<input type="text" id="col-fo-0' + i + '" class="form-control m-input"> </div> </div>';*/
    //numero de variaveis
    
    newTeste = "";
    var j = 0;

    // restrições
    for(i = 0; i < parseInt(num_var); i++){

        newTeste += '<div class="row" id="row-0' + i +'">';// + coluna+ '</div>';

        for(j = 0; j <= 3; j++){

            //if(cont < 3)
            //variaveis
            if(j == 3){

                coluna += '<div class="col"> <select class="form-control" id="select-fo">' +
              '<option><=</option><option>>=</option>' +
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

    // newTeste = "";
    // for(i = 0; i < parseInt(num_var); i++)
    // {
    //     newTeste += '<div class="row" id="row-0' + i +'">' + coluna+ '</div>';
    // }

    
    

});

$("#dual-btn").click(function () {
    let num_var = document.getElementById("fo").value;
    var value_checked = $("input:radio:checked").text();
    var ch = $("#radio-form input[type='radio']:checked").val();
    
    if(ch === "max")
    {
        ch= "MIN";

    }
    else
    {
        ch = 'MAX';
    }

    // ultima coluna de restrições em todas as linhas
    var preenchT = "";

    // IMPORTANTE: substituir o numero 3, pois se trata do numero de variaveis
    for(i = 0; i < parseInt(num_var); i++){

        //let alok = document.getElementById("#col-fo-003").value;
        var alok = $('#col-fo-0'+ i + '3').val();
        alert(alok);
        preenchT += alok + 'x' + (i+1);

        if( i < parseInt(num_var)-1){
            preenchT+=  ' + ';
        }

    }


    newRowAddFo =
    '<div class="row"> <div class="col">' +
    '<p> Função-Objetivo: ' + ch + ' C = ' + preenchT + '</p></div>' +
    '<p> Restrições: <br> ' +
    '</div>';


    // newRowAddFo =
    // '<div class="row"> <div class="col col-md-2"> <div class="input-group">' +
    // '<input type="text" class="form-control m-input"> </div> </div> </div>';

    $('#dual-saida').append(newRowAddFo);
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