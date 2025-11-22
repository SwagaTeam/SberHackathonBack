namespace Application.Dto;

public class EventDto
{
    public DateTime Date { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Address { get; set; }
    public bool RegisterRequired { get; set; }
    public int TotalEventSeats { get; set; }
    public int FreeEventSeats { get; set; }
    public bool IsSendNotification { get; set; }
}