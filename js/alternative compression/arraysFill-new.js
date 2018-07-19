if (variableIsSite)	query = window.location.search.substring(1);
if(query.indexOf("tal=")>-1) query = query.slice(4)

var vars = query;
var saveTemplate = new Array();
var decryptedURL = [];

for (e = 0; e < vars.length; e++) {
  saveTemplate[e] = vars.charAt(e);
}

saveTemplate = saveTemplate.toString().replace(/,/g, '');

for (i = 1; i < saveTemplate.length;) {
	currentChar = saveTemplate.charAt(0);
  
	if (currentChar == "-") {
		currentCharPat = saveTemplate.slice(0,4); saveTemplate = saveTemplate.slice(4, saveTemplate.length + 1); 
		currentCharPat = currentCharPat.toString().replace(/-/, '');
		hexRevConv = currentCharPat.slice(0,2); hexRevConv = parseInt(hexRevConv, 16);
		repCurChar = currentCharPat.slice(2,3);
   	
		j = hexRevConv;
		for (j > 0; j--;) {
			decryptedURL.push([repCurChar]);
		}
	}
	else if ((/[0-5]/).test(currentChar)) {
		decryptedURL.push([currentChar]);
		saveTemplate = saveTemplate.slice(1, saveTemplate.length + 1);
	}
	else
		decryptedURL = decryptedURL.toString("");
}

decryptedURL = decryptedURL.toString().replace(/,/g, '');
if (decryptedURL.length >= 742) {
	decryptedURL = decryptedURL.toString("");
}
else
	
saveTemplate = decryptedURL;

for (treeLoop = 0; treeLoop<tree.length; treeLoop++)
{
	pointsTree[treeLoop] = 0;
}

var numberOfTrees = tree.length;

var pointsTier=new Array(numberOfTrees);
for (i=0; i <numberOfTrees; i++) pointsTier[i]=new Array(tierNum);

var tierLoop = 0;

while (tierLoop < tierNum)
{
	for (var treeLoop = 0; treeLoop < numberOfTrees; treeLoop++)
	{
		pointsTier[treeLoop][tierLoop] = 0;
	}
	tierLoop++;	
}

tierLoop = 0;

var talentInsertID = 0;

//filling in new arrays:
//minLevel array: minimum level required for the talent
//rankBottom array: array used to display info about the ranks for the talents displayed at the bottom of the page

if (query)
{
	while (talent[talentInsertID])
	{
		minLevel[talentInsertID] = getMinLevel(talentInsertID); //fill in the minLevel array
		rankBottom[talentInsertID] = [1, rank[talentInsertID][0]];	
		talentValue = eval(saveTemplate[talentInsertID]);
		if (!talentValue) savedRank = 0;		
		else savedRank = talentValue;
		savedRankCurrent = savedRank - 1;
		savedRankNext = savedRank + 1;
		if (savedRankCurrent < 0) savedRankCurrent = 0;
		if (talent[talentInsertID][2] != 1)	rankTop[talentInsertID] = [savedRank, rank[talentInsertID][savedRankCurrent], rank[talentInsertID][savedRankNext]];	
		else rankTop[talentInsertID] = [savedRank, rank[talentInsertID][0]];	
		pointsInDaTree = talent[talentInsertID][0];
		pointsTree[pointsInDaTree] += savedRank;
		pointsTier[pointsInDaTree][talent[talentInsertID][4]-1] += savedRank;
		rankPoints -= savedRank;
		theRequiredLevel += savedRank;
		talentInsertID++;
	}
	var q = 0;
	while (q < talent.length)
	{
		hasDependentTalents[q] = 0;
		q++;
	}
	q=0;
	while (q < talent.length)
	{
		if (talent[q][5]) hasDependentTalents[talent[q][5][0]]++;
		q++;
	}
	maxTierArray[0] = getMaxTier(0);
	maxTierArray[1] = getMaxTier(1);
	maxTierArray[2] = getMaxTier(2); 
}
else
{
	while (talent[talentInsertID])
	{
		minLevel[talentInsertID] = getMinLevel(talentInsertID); //fill in the minLevel array
		rankBottom[talentInsertID] = [1, rank[talentInsertID][0]];	
		if (talent[talentInsertID][2] != 1)	rankTop[talentInsertID] = [0, rank[talentInsertID][0], rank[talentInsertID][1]];	
		else rankTop[talentInsertID] = [0, rank[talentInsertID][0]];	
		talentInsertID++;
	}
	var q = 0;
	while (q < talent.length)
	{
		hasDependentTalents[q] = 0;
		q++;
	}
	q=0;
	while (q < talent.length)
	{
		if (talent[q][5])
		hasDependentTalents[talent[q][5][0]]++;
		q++;
	}
}
jsLoaded=true;//needed for ajax script loading
