function mainIntial () {
    var model = new bookmodel();
    displayInitial();
    var control = new controller(model, view);
}