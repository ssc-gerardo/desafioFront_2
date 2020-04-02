const search_input = () => {

    var despliegue = document.getElementsByClassName("input_search").value;

    if(despliegue === true){

        

    }


}
$(document).ready(function() {
    var altura = $('.menu').offset().top;
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > altura) {
            $('.menu').addClass('menu-fixed')
        } else {
            $('.menu').removeClass('menu-fixed')
        }
    })
})


var PostsArray = [];
//Salud, Ciencia, Arte, Deportes, Política, Historia, Entretenimiento, Educación,Título,Subtítulo,Nombre,Apellidos,Biografía,Imagen,Artículo
const getPostData = () => {
    let postTitulo = $("#Post-Titulo").val();
    let postSubtitulo = $("#Post-Subtitulo").val();
    let postNombre = $("#Post-Nombre").val();
    let postApellidos = $("#Post-Apellidos").val();
    let postBiografia = $("#Post-Biografia").val();
    let postImagen = $("#Post-Imagen").val();
    let postArticulo = $("#Post-Articulo").val();
    let postSalud = $("#Post-Salud").val();
    let postCiencia = $("#Post-Ciencia").val();
    let postArte = $("#Post-Arte").val();
    let postDeportes = $("#Post-Deportes").val();
    let postPolitica = $("#Post-Politica").val();
    let postHistoria = $("#Post-Historia").val();
    let postEntretenimiento = $("#Post-Entretenimiento").val();
    let postEducacion = $("#Post-Educacion").val();
    let PostObject = {
        postTitulo, postSubtitulo, postNombre, postApellidos,
        postBiografia, postImagen, postArticulo, postSalud, postCiencia, postArte, postDeportes, postPolitica, postHistoria,
        postEntretenimiento, postEducacion
    }
    //PostsArray.push(PostObject)
    printPosts();
    savePostsToDb(PostObject);
    //saveKodersToDb(PostObject);
    $("#ventanaModal").modal("hide")
}
//$("#save-koder").on("click",getKoderData)
$("#Save-Post").on("click", getPostData)
//$("#save-koder").on("click",saveKodersToDb)
const assignDeletePostListener = () => {
    $(".delete-koder").on("click", deletePostInDb)//deleteKoderInDb)
}

const assigSecondaryPostListener = () => {
    $(".secondary-ref").on("click", printPostsSecondary)//deleteKoderInDb)
    console.log("se escucho el listener")
}

const printPosts = () => {
    $("#new-card").empty();
    PostsArray.forEach((post, index) => {
        $("#new-card").append(`
            <div class="card mb-3" >
                  <div class="row no-gutters">
                    
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${post.postTitulo}</h5>
                        <p class="card-text">${post.postSubtitulo}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                    <div class="col-md-4" secondary-ref"style="cursor: pointer;" data-post-index=${post.key}  data-toggle="modal" data-target="#ventanaPost>
                      <img src="images/article_1.jpeg" class="card-img" alt="...">
                    </div>

                  </div>
                </div>
        `)
    })
    assignDeletePostListener();
    assigSecondaryPostListener();
}
//<td><div class="btn btn-success secondary-ref"style="cursor: pointer;" data-post-index=${post.key}>Go to Post</div></td>
const deletePost = (event) => {
    let PostIndex = $(event.target).data("post-index")
    PostsArray.splice(PostIndex, 1)
    printPosts();
}
const getPostsFromDb = () => {
    PostsArray = [];
    $.ajax({
        url: "https://javascript-ajax-d0ce6.firebaseio.com/gerardo/posts/.json",
        method: "GET",
        success: (response) => {
            $.each(response, (key, value) => {
                PostsArray.push({ ...value, key })
                console.log(PostsArray)
            })
            printPosts();
        }
    })
}
const deletePostInDb = () => {
    let PostKey = $(event.target).data("post-index")
    $.ajax({
        url: `https://javascript-ajax-d0ce6.firebaseio.com/gerardo/posts/${PostKey}.json`,
        method: "DELETE",
        success: (response) => {
            console.log(response);
            getPostsFromDb();
        }
    })
}
const savePostsToDb = (PostObject) => {
    PostsArray = [];
    $.ajax({
        url: "https://javascript-ajax-d0ce6.firebaseio.com/gerardo/posts/.json",
        method: "POST",
        data: JSON.stringify(PostObject),
        //dataType: JSON.stringify(kodersArray)
        success: (response) => {
            console.log(response);
            getPostsFromDb();
        }
    })
}
getPostsFromDb();

//console.log("entra aqui 1")
var myPostArray = [];
const printPostsSecondary = () => {
    console.log("entro al print secondary")
    let PostKey = $(event.target).data("post-index")

    $.ajax({
        url: `https://javascript-ajax-d0ce6.firebaseio.com/gerardo/posts/${PostKey}.json`,
        method: "GET",
        success: (response) => {
            console.log(response)
            /*$.each(response,(key,value)=>{
                myPostArray.push({...value,key})
                
                console.log(value)
                console.log(myPostArray)
            })*/

            let postObject = { ...response}
            $("#complete-post").append(`
        
            <div class="col-md-9">
            <h1 class="h1">${postObject.postTitulo}</h1>
            <h2 class="h2">${postObject.postSubtitulo}</h2>
        <div class="card promoting-card">
        <div class="card-body d-flex flex-row">
            <img src="images/profile-1.jpg" class="rounded-circle mr-3" height="50px" width="50px" alt="avatar">
            <div>
            <h4 class="card-title">${postObject.postNombre}</h4>
            <p class="card-text">Mar 25 · 4 min read</p>
            </div>
        </div>
        </div>
    
        <img src="${postObject.postImagen}" width=900></img>
        <h6 class="h6 p-3">Photo: Getty Images</h6>
        <p class="p">${postObject.postArticulo}
        </p>
        <div class="row justify-content-origin">
        <button class="category">Salud</button>
        <button class="category">Ciencia</button>
        <button class="category">Arte</button>
        <button class="category">Deportes</button>
        <button class="category">Política</button>
        <button class="category">Historia</button>
        <button class="category">Entrenamiento</button>
        <button class="category">Educación</button>
        </div>
        <img class="row justify-content-origin" src="images/claps.png" width=90 alt="clap-button">
        <div class="small-div"></div>
        <div class="card promoting-card">
        <div class="card-body d-flex flex-row">
            <img src="images/profile-1.jpg" class="rounded-circle mr-3" height="100px" width="100px" alt="avatar">
            <div>
            <h2 class="card-title">${postObject.postNombre}</h2>
            <p class="card-bio">${postObject.postBiografia}</p>
            </div>
        </div>
        </div>
    </div>`)
            
    myPostArray = []
    //printPosts();
}
    })



    //$("#koders-table").find("tbody").empty();

    //assignDeletePostListener();
}