'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        
        $scope.dishes = menuFactory.getDishes();
        
        $scope.select = function(setTab){
            if (setTab === 2){
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3){
                $scope.filtText = "mains";
            }
            else if (setTab === 4){
                $scope.filtText = "dessert";
            }
            else{
                $scope.filtText = "";
            }
            $scope.tab = setTab;
        };
        
        $scope.isSelected = function(checkTab){
            return ($scope.tab === checkTab);
        };
        
        $scope.toggleDetails = function(){
            $scope.showDetails = !$scope.showDetails;  
        };
        
        
    }])
    
    .controller('ContactController', ['$scope', function($scope){
        $scope.feedback = {
            mychannel:'',
            firstName:'',
            lastName:'',
            agree:false,
            email:''
        };
        var channels = [{value:'tel', label:'Tel.'},
                        {value:'Email', label:'Email'}];
        $scope.channels = channels;
        $scope.invalidChanellSelection = false;
        
    }])
    
    .controller('FeedbackController', ['$scope', function($scope){
        $scope.sendFeedback = function(){
            console.log($scope.feedback); 
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel:"", 
                    firstName:"",  
                    lastName:"",
                    agree:false, 
                    email:"" 
    
                };
                $scope.feedback.mychannel="";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])
    
    .controller('DishDetailController', ['$scope','$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory){
           /* console.log('test');
            $scope.predicate = '';
            $scope.reverse = false;
            if($scope.predicate.indexOf('-') === 0){
                $scope.reverse = true;
            }*/
            //console.log($routeParams.id);
            var dish= menuFactory.getDish(parseInt($stateParams.id,10));
            
            $scope.dish = dish;
            $scope.orderByList = [
                {value: 'rating', label: 'Rating'},
                {value: 'comment', label: 'Comment'},
                {value: 'author', label: 'Author'},
                {value: 'date', label: 'Date'}
            ];
            
    }])
    
     .controller('DishCommentController', ['$scope', function($scope) {
        
        $scope.userComment = {
            rating:5,
            comment:'',
            author:'',
            date: null
        };
        
        $scope.submitComment = function () {
            $scope.userComment.rating = Number($scope.userComment.rating);
            
            $scope.userComment.date = new Date().toISOString();
            $scope.dish.comments.push($scope.userComment);
            $scope.userCommentForm.$setPristine();
            $scope.userComment = {
                rating:5,
                comment:'',
                author:'',
                date: null
            };

                            
        };
    }])
    
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){
        $scope.featured = menuFactory.getDish(0);
        $scope.promo = menuFactory.getDish(2);
        $scope.leader = corporateFactory.getLeader(3);
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
        $scope.leaders = corporateFactory.getLeaders();
    }])
;