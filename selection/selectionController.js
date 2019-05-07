const app = angular.module('grid', ['ui.grid', 'ui.grid.selection', 'ui.grid.cellNav']);

app.controller("selectionController", ($scope, $log, $compile) => {
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
            estadoMostrar: "GEs",
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



    $scope.gridContratistaOptions = {
        data: $scope.datasource,
        showFooter: true,
        enableFullRowSelection: true,
        enableFooterTotalSelected: true,
        paginationPageSizes: [10, 50, 75],
        isRowSelectable : (row) =>  row.entity.estadoMostrar !== "GEM" ? false : true,
        columnDefs: [{
                name: 'estadoMostrar',
                enableColumnMenu: false,
                displayName: 'Estado',
                width: "10%"
            },
            {
                name: 'numContrato',
                enableColumnMenu: false,
                displayName: 'Contrato',
                width: "8%"
            },
            {
                name: 'primerNombreContratista',
                enableColumnMenu: false,
                displayName: 'Nombre Constratista',
                width: "40%"
            },
            {
                name: 'primerApellidoContratista',
                enableColumnMenu: false,
                displayName: 'Apellido Contratista',
                headerCellClass: 'centerGestionInforme',
                headerCellTemplate: '<div>Apellido <br/> Contratista</div>',
                width: "40%"
            },

        ]
    };


    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;

        gridApi.selection.on.rowSelectionChanged($scope,  (row) => actualizarGridPlanilla(row));
        gridApi.selection.on.rowSelectionChangedBatch($scope,  (rows) => rows.forEach((row) => actualizarGridPlanilla(row)));
    };

    function actualizarGridPlanilla(row) {
        if (row.isSelected) {
            $scope.gridPlanillaOptions.data.push(row.entity);
        }
        else  {
            const indice = $scope.gridPlanillaOptions.data.findIndex(contratista => contratista.numContrato == row.entity.numContrato);
            $scope.gridPlanillaOptions.data.splice(indice, 1);
        }
    }
    

    $scope.gridPlanillaOptions = {
        multiSelect: false,
        enableRowHeaderSelection: false
    };
    $scope.gridPlanillaOptions.onRegisterApi = function (gridApi) {
        $scope.gridPlanillaApi = gridApi;

        gridApi.selection.on.rowSelectionChanged($scope, (row) => {    
                const indice = $scope.gridOptions.data.findIndex(contratista => contratista.numContrato == row.entity.numContrato);
                $scope.gridApi.selection.unSelectRow($scope.gridOptions.data[indice]);
        });
    };

});


