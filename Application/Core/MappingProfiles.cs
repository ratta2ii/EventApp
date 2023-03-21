using AutoMapper;
using Domain;

namespace Application.Core
{
    /// <summary>
    /// Uses Automapper to merge profiles (i.e. objects) during editing processes.
    /// </summary>

    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}