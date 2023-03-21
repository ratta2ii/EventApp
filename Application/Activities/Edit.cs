using MediatR;
using Persistence;
using Domain;
using AutoMapper;

namespace Application.Activities
{
    public class Edit
    {
        public class Commnad : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Commnad>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;
            
            /// <param name="mapper">Used in merging objects during editing processes.</param>
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Commnad request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                // Rather than using the null coalescing operator to do individual property editing (as seen below),
                // we are using AutoMapper instead (See Application/Core/MappingProfiles for additional details).
                // activity.Title = request.Activity.Title ?? activity.Title;

                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}