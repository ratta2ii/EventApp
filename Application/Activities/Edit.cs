using MediatR;
using Persistence;
using Domain;
using AutoMapper;
using FluentValidation;
using static Application.Activities.Create;
using Application.Core;

namespace Application.Activities
{
    public class Edit
    {
        public class Commnad : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }


        public class Handler : IRequestHandler<Commnad, Result<Unit>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            /// <param name="mapper">Used in merging objects during editing processes.</param>
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Commnad request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null)
                    return null;

                // Rather than using the null coalescing operator to do individual property editing (as seen below),
                // we are using AutoMapper instead (See Application/Core/MappingProfiles for additional details).
                // activity.Title = request.Activity.Title ?? activity.Title;
                _mapper.Map(request.Activity, activity);

                var results = await _context.SaveChangesAsync() > 0;

                if (!results)
                    return Result<Unit>.Failure("Failed to update activity.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}