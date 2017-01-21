var app = angular.module('app');

app.controller('TabController', function() {
    var ctrl = this;
    this.tab = 0;
    this.setTab = function(tab) {
        ctrl.tab = tab;
    };
    this.isSet = function(tab) {
        return ctrl.tab === tab;
    };
});
app.controller('CadernoController', ['Caderno', 'Nota', '$scope', function(Caderno, Nota, $scope) {
    var ctrl = this;

    this.init = function(cb) {
        Caderno.query().$promise.then(function(data) {
            ctrl.cadernos = data;
            if (!ctrl.inicio) {
                ctrl.selectCaderno(ctrl.cadernos[0]);
                ctrl.inicio = 1;
            } else {
                ctrl.selectCaderno(ctrl.cadernos.filter(function(c) {
                    return c._id === ctrl.caderno._id;
                })[0]);
                ctrl.selectNota(ctrl.caderno.notas.filter(function(n) {
                    return n._id = ctrl.nota._id;
                })[0]);
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
                ctrl.init();
            });
        } else {
            Nota.save({
                cadernoId: cadernoId
            }, ctrl.nota, function(n) {
                ctrl.init();
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
            ctrl.init();
        });
    };

    this.cadernoSelected = function(caderno) {
        return ctrl.caderno === caderno;
    };

    this.notaSelected = function(nota) {
        return ctrl.nota === nota;
    };

    this.init();
}]);