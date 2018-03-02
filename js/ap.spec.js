describe('Test fuel', function (){
    it("test electricity", function(){
        let ind =[1,2,3,4,-1];
        for (let i =0; i<fuelsNames.length; i++) {

            assert.equal(getFuelByName(fuelsNames[i]), ind[i]);
        }
    });

    it("test random function", function(){
        //assert.equal(setCurrentFuelType(),`${'electricity'||'gas'||'water'||'elecgas'}`);
        assert.throws(setCurrentFuelType(),"TypeError: Cannot read property 'toLowerCase' of undefined");
    });



    it("test incorrect electricity", function(){
        assert.notEqual(getFuelByName('electricity'),"Bill");
    });
});