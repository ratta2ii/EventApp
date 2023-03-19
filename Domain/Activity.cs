namespace Domain
{
    /// <summary>
    /// Entity Framework needs ALL properties to be public w/ getters and setters.
    /// </summary>
    public class Activity
    {
        /// <summary>
        /// This is the primary key that will be used in the database.
        /// </summary>
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }
    }
}