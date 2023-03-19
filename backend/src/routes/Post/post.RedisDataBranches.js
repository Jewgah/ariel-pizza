export class RedisDataBranches
{
    constructor(branches)
    {
        if (branches.branch == 'North1' && branches.action == 'open'){
            this.North1 = true;
        }
        if (branches.branch == 'North1' && branches.action == 'false'){
            this.North1 = false;
        }

        if (branches.branch == 'North2' && branches.action == 'open'){
            this.North2 = true;
        }
        if (branches.branch == 'North2' && branches.action == 'false'){
            this.North2 = false;
        }

        if (branches.branch == 'North3' && branches.action == 'open'){
            this.North3 = true;
        }
        if (branches.branch == 'North3' && branches.action == 'false'){
            this.North3 = false;
        }

        if (branches.branch == 'Haifa1' && branches.action == 'open'){
            this.Haifa1 = true;
        }
        if (branches.branch == 'Haifa1' && branches.action == 'false'){
            this.Haifa1 = false;
        }

        if (branches.branch == 'Haifa2' && branches.action == 'open'){
            this.Haifa2 = true;
        }
        if (branches.branch == 'Haifa2' && branches.action == 'false'){
            this.Haifa2 = false;
        }

        if (branches.branch == 'Haifa3' && branches.action == 'open'){
            this.Haifa3 = true;
        }
        if (branches.branch == 'Haifa3' && branches.action == 'false'){
            this.Haifa3 = false;
        }
        
        if (branches.branch == 'Central1' && branches.action == 'open'){
            this.Central1 = true;
        }
        if (branches.branch == 'Central1' && branches.action == 'false'){
            this.Central1 = false;
        }

        if (branches.branch == 'Central2' && branches.action == 'open'){
            this.Central2 = true;
        }
        if (branches.branch == 'Central2' && branches.action == 'false'){
            this.Central2 = false;
        }

        if (branches.branch == 'Central3' && branches.action == 'open'){
            this.Central3 = true;
        }
        if (branches.branch == 'Central3' && branches.action == 'false'){
            this.Central3 = false;
        }

        if (branches.branch == 'Dan1' && branches.action == 'open'){
            this.Dan1 = true;
        }
        if (branches.branch == 'Dan1' && branches.action == 'false'){
            this.Dan1 = false;
        }

        if (branches.branch == 'Dan2' && branches.action == 'open'){
            this.Dan2 = true;
        }
        if (branches.branch == 'Dan2' && branches.action == 'false'){
            this.Dan2 = false;
        }

        if (branches.branch == 'Dan3' && branches.action == 'open'){
            this.Dan3 = true;
        }
        if (branches.branch == 'Dan3' && branches.action == 'false'){
            this.Dan3 = false;
        }

        if (branches.branch == 'South1' && branches.action == 'open'){
            this.South1 = true;
        }
        if (branches.branch == 'South1' && branches.action == 'false'){
            this.South1 = false;
        }

        if (branches.branch == 'South2' && branches.action == 'open'){
            this.South2 = true;
        }
        if (branches.branch == 'South2' && branches.action == 'false'){
            this.South2 = false;
        }

        
        if (branches.branch == 'South3' && branches.action == 'open'){
            this.South3 = true;
        }
        if (branches.branch == 'South3' && branches.action == 'false'){
            this.South3 = false;
        }
        
        console.log("data constructor: " + branches);
    }

}