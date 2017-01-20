var app = angular.module('app');

app.controller('TabController', function() {
    var ctrl = this;
    this.tab = 0;
    this.setTab = function(tab) {
        ctrl.tab = tab;
    };
    this.isSet = function(tab) {
        return ctrl.tab == tab;
    };
});
app.controller('CadernoController', ['Caderno', 'Nota', function(Caderno, Nota) {
    var ctrl = this;

    this.init = function() {
        Caderno.query().$promise.then(function(data) {
        	ctrl.cadernos = data;
        	if(data.length) {
                ctrl.cadernos.forEach( c => {
                    if(c._id == ctrl.caderno._id)
                        ctrl.caderno = c;
                });
        		//ctrl.caderno = ctrl.cadernos[0];
        		if(ctrl.caderno.notas.length) {                
                   ctrl.selectNota(ctrl.nota);
        			//ctrl.nota = ctrl.caderno.notas[0];
        		}
        	}
        });
    };

    this.selectCaderno = function(caderno) {
        ctrl.caderno = caderno;
        ctrl.nota = caderno.notas[0];
    };
    this.novoCaderno = function(nomeCaderno) {
        var cad = {};
        cad.nome = nomeCaderno;
        Caderno.save(cad, function(caderno) {
            ctrl.cadernos.push(caderno);
        });
    };
    this.selectNota = function(nota) {
        ctrl.nota = nota;
    };
    this.novaNota = function() {
        ctrl.nota = {};
    };
    this.salvarNota = function() {
        var cadernoId = ctrl.caderno._id;
        if (ctrl.nota._id) {
        	var notaId = ctrl.nota._id;
            Nota.update({
                cadernoId: cadernoId,
                id: notaId
            }, ctrl.nota, function(n) {
                setTimeout(ctrl.init(),500);
            });
        } else {
            Nota.save({
                cadernoId: cadernoId
            }, ctrl.nota, function(n) {
                setTimeout(ctrl.init(),500);
            });
        }
    };
    this.apagarNota = function() {
        var cadernoId = ctrl.caderno._id;
        var notaId = ctrl.nota._id;
        Nota.delete({
            cadernoId: cadernoId,
            id: notaId
        }, function(n) {
            setTimeout(ctrl.init(),500);
        });
    };

    this.init();
}]);
