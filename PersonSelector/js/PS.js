(function () // хитрая запись, позволяющая сделать все наши переменные видимыми только в нашем js файле, так что если Вася у себя создаст переменную с таким же именем,наша с ним не будет конфликтовать. Но для этого надо обязательно сразу же вызвать нашу безымянную функцию. См в последней строке кода
{            // это НЕ онлоад! это выполняется перед онлоадом.   

        //------------------ Кнопка Choose person и поле для дальнейшего вывода персон-----------
             
        //------------------- создем модальное бутстраповское окно ------------
        var buttonModal = $("<button>").attr("type","button").addClass("close")
                .attr("data-dismiss","modal").attr("aria-label","Close")
                .append($("<span>").attr("aria-hidden","true").html("x"));
        var h4 = $("<h4>").addClass("modal-title").html("Modal title");
        var div4 = $("<div>").addClass("modal-header").append(buttonModal).append(h4);
        var p = $("<p>");        
        var div5 = $("<div>").addClass("modal-body").append(p);
        var div7 = $("<button>").attr("type","button").addClass("btn btn-danger").attr("data-dismiss","modal").html("Close");
        var div8 = $("<button>").attr("type","button").addClass("btn btn-primary saveChange").html("Save Change");
        var div6 = $("<div>").addClass("modal-footer").append(div7).append(div8);
        var div3 = $("<div>").addClass("modal-content").append(div4).append(div5).append(div6);
        var div2 = $("<div>").addClass("modal-dialog").append(div3);
        var div1 = $("<div>").addClass("modal fade").append(div2).attr("id","personSelectorModal");
        
        

        // TODO: убрать это!
        $(function() // на онлоаде добавляем модальное окно
        {
            $("body").append(div1);
                       
            $(".saveChange").on("click", function()
                   {
                       $('.personSelector_add').html('');
                       $(this).attr("data-dismiss","modal");
                        $("#personSelectorModal").data("personPerson").thisPerson = $(".personRow.active").data("this.thisPerson");  
                        //console.error(this.thisPerson);
                       $(".personRow.active").clone().addClass("personRow").appendTo(".personSelector_add");
                       
                       $("#personSelectorModal").data("personPerson").d.resolve(); // переключаем состояние деферреда при нажатии кнопки save change
            
        });
    });


        window.PersonSelector = function(place) // window - для того что бы сделать функцию глобално видимой (для ВАСИ и других скриптов). В Функции выполняем все действия и описывам методы работы с списком людей
        { 
              //---------------- эти this мы объявляем здесь для того, что бы Вася мог объявить 2 разных списка данных
        this.persons1 = [];//------------------- массив с персонами, который мы получаем от Васи (ниже по коду) ------------
        this.d = $.Deferred();   // объявляем деферед объект
        this.thisPerson = undefined;
        var t=this;
        
       // console.info(u);
        //var t = this; // записываем весь  наш объект в переменную потому что дальше this указывает на кнопку
        var button = $("<button>").addClass("btn btn-primary choose");
       // var but=this.button;
        var textarea = $("<div>").addClass("personSelector_add").html('No person selected');
        // var textArea = this.textarea; 
        var div = $("<div>");
        
        //console.log(this);    
            
                    //------------объявлем методы для Васи-----------
            this.addPerson = function(person,index) // метод, позволяющий впихнуть нового человека в юбое место массива. Или добавлять людей по порядку в массив
                    {
                        if (index === undefined || index > person.length)
                        {
                            
                            this.persons1[this.persons1.length]=person;
                        }
                        else
                        {
                            this.persons1.splice(index,0,person);
                        }
                        
                      
                    };
            
            this.removePerson = function (name) //  метод, позволяющий удалять человека по имени (удалять весь объект с массива)
            {
                
                
                for (var i = 0; i<this.persons1.length; i++)
                {
                    if (this.persons1[i].name==name)
                    {
                        this.persons1.splice(i,1);
                        
                        i--;
                        
                    }
                } 
                
                if ((this.thisPerson)&&(this.thisPerson.name==name))
                {
                   this.thisPerson=undefined;
                   textarea.html("No Person Selected");                  
                }
            };
            
                     
            this.getCount = function() // метод, который считает количество людей, переданных нам ВАСЕЙ
               {
                   
                       return this.persons1.length;
                   
               };
            
            this.setSelectPerson = function(person) // метод, позволяющий Васе насильно установить человека в нашу textarea
                {
                    for (var i = 0; i<t.persons1.length; i++)
                    {
                        if (this.persons1[i].name==person)
                        {
                             $('.personSelector_add').html('');
                             $('.personSelector_add').append(buildHtml(persons1[i]));
                             this.thisPerson = this.persons1[i];
                             this.d.resolve(); 
                        }
                     }
                };
                        
            this.getSelectPerson = function() // метод, позволяющий Васе получить от нас объект с выбранным человеком
                {
                    return this.thisPerson;
                };
                
             this.getPromise = function () // метод для Васи - подписка на состояние Промис объекта
            {
            
           
                       
            return this.d.promise(); // возвращаем Васе состояние деферед объекта
            };
                
            place.append((div).append((button).html("Choose Person")).append(textarea));  // это мы рисуем кнопку   Choose Person
            button.on("click", circle(t));
            
            
//            function() // Событие клика на кнопку Choose Person 
//                {
//                                    
//                    //console.log(t);
//                    $("#personSelectorModal").data("personPerson",t);
//                    p.html(""); // очищаем модальное окно от любых предыдущих элементов в нем
//                    for(var i=0;i<t.persons1.length;i++) // цикл по массиву объектов с людьми
//                    {
//                         
//                        //------------ стром div с выводом каждого человека в списк в модальном окне -----
//                     buildHtml(t.persons1[i]); 
//                     p.append(buildHtml(t.persons1[i]));
//                     
//                    
//                    }
//                
//                    $('#personSelectorModal').modal({"backdrop":"static"}); // выводим модальное окно
//                    
//                    $(".personRow").on("click",function() // соытие на клине на рядок с конкретным человеком в модальном окне
//                    {
//                        
//                        //--------------- это алгоритм подсветки выбранного мышкой человека-----------
//                       if ($(this).hasClass('active'))
//                        {
//                            $(this).removeClass('active');        
//                        }
//                        else
//                        {
//                            $('.personRow').removeClass('active');
//                            $(this).addClass("active");
//                        } 
//                    });     
//                });
        };  

function buildHtml(i)
{
    var img = $("<img>").attr("src",i.url).addClass("brakozyaka");
    var div10=$("<div>").addClass("col-md-3").append(img);
    var div12 = $("<div>").html(i.name);
    var div13 = $("<div>").html(i.adress);
    var div11=$("<div>").addClass("col-md-9").append(div12).append(div13);
    var div9 = $("<div>").addClass("row personRow").data("this.thisPerson",i).append(div10).append(div11);
    
    return div9;
}


 
 String.prototype.pretty = function ()
            {
              var s = this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
              return s;                
            };;
            
            
function circle (t)
{
    
    //console.info(t);
    return function()
    {
          
                                    
                    //console.log(t);
                    $("#personSelectorModal").data("personPerson",t);
                    p.html(""); // очищаем модальное окно от любых предыдущих элементов в нем
                    for(var i=0;i<t.persons1.length;i++) // цикл по массиву объектов с людьми
                    {
                         
                        //------------ стром div с выводом каждого человека в списк в модальном окне -----
                     buildHtml(t.persons1[i]); 
                     p.append(buildHtml(t.persons1[i]));
                     
                    
                    }
                
                    $('#personSelectorModal').modal({"backdrop":"static"}); // выводим модальное окно
                    
                    $(".personRow").on("click",function() // соытие на клине на рядок с конкретным человеком в модальном окне
                    {
                        
                        //--------------- это алгоритм подсветки выбранного мышкой человека-----------
                       if ($(this).hasClass('active'))
                        {
                            $(this).removeClass('active');        
                        }
                        else
                        {
                            $('.personRow').removeClass('active');
                            $(this).addClass("active");
                        } 
                    });     
                
    };
}

})(); // () - это вызов нашей безымянной функции сразу после ее объявления...    
 


