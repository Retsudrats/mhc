var talent = new Array();
var rank = new Array();
var tree = new Array();
var nltree = new Array();
var nltalent = new Array();
var rankBottom = new Array();
var minLevel = new Array();
var hasDependentTalents = new Array();
var treeStartStop = new Array();
var rankTop = new Array();
var pointsTree = new Array();
var maxTierArray = new Array();
maxTierArray[0] = 1;
maxTierArray[1] = 1;
maxTierArray[2] = 1;
maxTierArray[3] = 1;

var template = new Array();

var levelMax = 999;
var levelMin = 2;
var tierNum = 7;

var rankPoints = levelMax - levelMin + 1;
var rankPointsMax = rankPoints;
var levelCurrent = levelMax;

var theRequiredLevel = levelMin;
jsLoaded=true;//needed for ajax script loading