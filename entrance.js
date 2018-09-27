function Entrance(username, coordinates, text)
{
    this.userName = username;
    this.coordinates = coordinates;
    this.text = text;

    this.getText = function()
    {
        return this.text;
    }
    this.getUserName = function()
    {
        return this.userName;
    }

    this.getCoordinates = function()
    {
        return this.coordinates;
    }

}