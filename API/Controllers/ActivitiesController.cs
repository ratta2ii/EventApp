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
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        // Route: api/activities/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id = id});

            return HandleResult(result);
        }

        // Route: api/activities
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        // Route: api/activities/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Commnad{ Activity = activity }));
        }
        
        // Route: api/activities/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{ Id = id }));
        }
    }
}