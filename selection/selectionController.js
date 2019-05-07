const app = angular.module('grid', ['ui.grid', 'ui.grid.selection', 'ui.grid.cellNav']);

app.controller("selectionController", ($scope, $log) => {
    const vm = this;


    $scope.datasource = [{
        estadoMostrar: "GEM",
        numContrato: 3344,
        primerNombreContratista: "JULIO CESAR",
        primerApellidoContratista: "RAMIREZ OSPINA"
    },
    {
        estadoMostrar: "GEM",
        numContrato: 3333,
        primerNombreContratista: "JULIO ISAAC",
        primerApellidoContratista: "RAMIREZ SARMIENTO"
    },
    {
        estadoMostrar: "GEM",
        numContrato: 2222,
        primerNombreContratista: "SAMUEL",
        primerApellidoContratista: "RAMIREZ SARMIENTO"
    },
    {
        estadoMostrar: "GEM",
        numContrato: 1111,
        primerNombreContratista: "VALENTINA",
        primerApellidoContratista: "RAMIREZ SARMIENTO"
    }
    ];



    $scope.gridOptions = {
        data: 'datasource',
        showFooter: true,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        enableFullRowSelection: true,
        enableSelectAll: true,
        multiSelect: true,
        paginationPageSizes: [10, 50, 75],
        columnDefs: [
            { name: 'estadoMostrar', enableColumnMenu: false, displayName: 'Estado', width: "10%" },
            { name: 'numContrato', enableColumnMenu: false, displayName: 'Contrato', width: "8%" },
            { name: 'primerNombreContratista', enableColumnMenu: false, displayName: 'Nombre Constratista', width: "40%" },
            { name: 'primerApellidoContratista', enableColumnMenu: false, displayName: 'Apellido Contratista', headerCellClass: 'centerGestionInforme', headerCellTemplate: '<div>Apellido <br/> Contratista</div>', width: "40%" },

        ]
    };

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;

        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            var msg = 'row selected ' + row.isSelected;
            if (row.isSelected) {
                $scope.gridPlanillaOptions.data.push(row.entity);
            } else {
                const indice = $scope.gridPlanillaOptions.data.findIndex(contratista => contratista.numContrato == row.entity.numContrato);
                console.log("indice", indice, row.entity.numContrato );
                $scope.gridPlanillaOptions.data.splice(indice, 1);
            }

            $log.log(row);
        });

        gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            var msg = 'rows changed ' + rows.length;
            $log.log(msg);
        });
    };


    $scope.gridPlanillaOptions = {
        enableFullRowSelection: true,
    };
    $scope.gridPlanillaOptions.onRegisterApi = function (gridApi) {
        $scope.gridPlanillaApi = gridApi;

        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            var msg = 'row selected ' + row.isSelected;

            $log.log(row.entity);
        });

        gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            var msg = 'rows changed ' + rows.length;
            $log.log(msg);
        });
    };



});