var controller = function (model, view) {
    this.view = view;
    this.model = model;
    this.addelementnew = function (a, b, c, d) {
        this.model.newelement(a, b, c, d);
    }

    this.itemcheck = function (a) {
        var a = this.model.elementExists(a);
        if (a == true)
            return true;
        else
            return false;
    }

    this.updateEntry = function (a,b,c,d) {
        this.model.update(a,b,c,d);
    }


}