var Book = function (a, b, c, d) {
    this.item = a;
    this.describe = b;
    this.publisher = c;
    this.price = d;
}

var bookmodel = function () {
    this.BookList = [];
    this.BookMapper = {};
    this.defaulter();
}
bookmodel.prototype.defaulter = function () {
    var a = new Book("My Story", "Williams", "Shradda", 250);
    this.BookList.push(a);
    this.mappingset(a);
    var b = new Book("Mimes", "Donalder", "Raphi", 350);
    this.BookList.push(b);
    this.mappingset(b);
    //this.refresher();
}

bookmodel.prototype.getDetails = function (i){
    return this.BookList[i];
}

bookmodel.prototype.mappingset = function (a) {
    this.BookMapper[a.item] = a;
}

bookmodel.prototype.newelement = function (a, b, c, d) {
    var k = new Book(a, b, c, d);
    this.BookList.push(k);
    this.mappingset(k);
    //this.refresher();
}
bookmodel.prototype.elementExists = function (a) {
    var b = this.BookMapper[a];
    if (b!=null) {
        return true;
    }
    else {
        return false;
    }
}

bookmodel.prototype.update = function (a,b,c,d) {
    index = this.BookList.findIndex(x => x.item==a);
    this.BookList[index].describe = b;
    this.BookList[index].price=d;  
    this.BookList[index].publisher=c;
    this.mappingset(new Book(a,b,c,d));
    
}

bookmodel.prototype.refresher = function(){
    this.BookList=[];
    for (var key in this.BookMapper){
        var a = this.BookList[key];
        var b = new Book(a.item,a.describe,a.publisher,a.price);
        this.BookList.push(b);
    }
}

bookmodel.prototype.delete = function(i) {
    this.BookMapper[this.BookList[i].item]=null;
    this.BookList.splice(i,1);
    
}

