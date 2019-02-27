const elementID = (a) => { return document.getElementById(a); };
function formDisplayMain() {
    elementID('bookListTable').style.display = "none";
    elementID('headerButtons').style.display = "none";
    elementID('formForBook').style.display = "block";
    elementID('myInput').value = "";
    elementID('myDescription').value = "";
    elementID('myPublisher').value = "";
    elementID('prior').value = "";
    elementID('myInput').focus();
    elementID('myInput').disabled=false;
}

function checkboxesItemcheck() {
    checkboxes = document.getElementsByClassName('checkBoxSet');
    var k = 0;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true)
            k++;
    }
    if (k == 1) {
        return true;
    }
    else {
        if (k == 0) {
            alert("select atleast one!!");
        }
        else {
            alert("Cannot Update more than one!!!");
        }
        return false;
    }
}

function findIcheckBox() {
    checkboxes = document.getElementsByClassName('checkBoxSet');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true)
            return i;
    }

}

function formUpdatePage(source) {
    var i = findIcheckBox();
    var book = source.getDetails(i);
    elementID('myInput').value = book.item;
    elementID('myInput').disabled=true;
    elementID('myDescription').value = book.describe;
    elementID('myPublisher').value = book.publisher;
    elementID('prior').value = book.price;
    elementID('bookListTable').style.display = "none";
    elementID('headerButtons').style.display = "none";
    elementID('formForBook').style.display = "block";
}

function displayInitial() {
    elementID('formForBook').style.display = "none";
    var model = new bookmodel();
    var control = new controller(model, this);
    this.viewMain = function () {
        var text = "<table id='bookTable'><tr><th>select <br><input type='checkbox' onclick='toggler(this)'></th><th>Book name</th><th>Book author</th><th>Book Publisher</th><th>Book Price</th></tr>";
        for (var i = 0; i < model.BookList.length; i++) {
            text += "<tr id=" + i + "><td><input type='checkbox' id='checkerbox' class='checkBoxSet' > </td><td  id='myitemval' class='status'> " + model.BookList[i].item + " </td><td> " + model.BookList[i].describe + " </td><td> " + model.BookList[i].publisher + " </td><td> " + model.BookList[i].price + " </td></tr>";
        }
        text += "</table>"
        return text;
    }
    elementID('bookListTable').innerHTML = viewMain();
    this.toggler = function (source) {
        checkboxes = document.getElementsByClassName('checkBoxSet');
        for (var i = 0; i < checkboxes.length; i++) {
            //if (checkboxes[i].getAttribute('type') == 'checkbox')
                checkboxes[i].checked = source.checked;
        }
    }
    elementID('myInput').onblur = function () {
       
        var status = control.itemcheck(elementID('myInput').value);
        if (status == true) {
            elementID('duplicateerror').innerHTML="Element already exists!!";
            elementID('myInput').focus();
            elementID('myInput').style = "border-color:red";
        }else {
            elementID('duplicateerror').innerHTML=" ";
            elementID('myInput').style = "border-color:none";
        }
    }
    elementID('formAddButton').onclick = function () {
        if(document.getElementById("myInput").value=="" || document.getElementById("myPublisher").value=="" ||  document.getElementById("prior").value=="" || document.getElementById("myDescription").value=="" ){
            alert("Enter all the feilds!");
            return;
            }
        control.addelementnew(elementID('myInput').value, elementID('myDescription').value,
            elementID('myPublisher').value, elementID('prior').value);
        elementID('bookListTable').style.display = "block";
        elementID('headerButtons').style.display = "block";
        elementID('formForBook').style.display = "none";
        elementID('bookListTable').innerHTML = viewMain();
    }

    elementID('addNewBook').onclick = function () {
         elementID('formAddButton').style="display:block";
        elementID('formUpdateButton').style.display = "none";
        formDisplayMain();
        
    }

    elementID('updateABook').onclick = function () {
        var status = checkboxesItemcheck();
        if (status == true) {
            
            formUpdatePage(model);
          elementID('formUpdateButton').style.display = "block";
            elementID('formAddButton').style="display:none";
           
        }
    }

    elementID('formUpdateButton').onclick = function () {
        
        control.updateEntry(elementID('myInput').value, elementID('myDescription').value,
        elementID('myPublisher').value, elementID('prior').value);
        elementID('bookListTable').style.display = "block";
        elementID('headerButtons').style.display = "block";
        elementID('formForBook').style.display = "none";
        elementID('bookListTable').innerHTML = viewMain();
    }

    elementID('formCancelButton').onclick = function () {
        elementID('bookListTable').style.display = "block";
        elementID('headerButtons').style.display = "block";
        elementID('formForBook').style.display = "none";
    }
    elementID('DeleteBookS').onclick = function () {
        checkboxes = document.getElementsByClassName('checkBoxSet');
        var cnt=0;
        for (var i = checkboxes.length-1; i >=0 ; i--) {
            if (checkboxes[i].checked == true)
                cnt++;
        }
        var status = control.noOfCheck(cnt);
        if (status==true)
        {
            if (!confirm("Do you want to delete all the items?"))
                elementID('bookListTable').innerHTML = viewMain();
            else
                control.deleteall();
        }
        else{
        for (var i = checkboxes.length-1; i >=0 ; i--) {
            if (checkboxes[i].checked == true){
                model.delete(i);
            }
        }
    }
        elementID('bookListTable').innerHTML = viewMain();

}
}
