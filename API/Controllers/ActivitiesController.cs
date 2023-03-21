using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Domain;

namespace API.Controllers
{
    /// <summary>
    /// NOTE: Mediator pattern (data context is not accessed from here).
    /// <summary>
    public class ActivitiesController : BaseApiController
    {  
        // Route: api/activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        // Route: api/activities/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        // Route: api/activities
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        // Route: api/activities/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Commnad{ Activity = activity }));
        }
        
        // Route: api/activities/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{ Id = id }));
        }
    }
}