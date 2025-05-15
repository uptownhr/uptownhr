{
  inputs = {
     # Utility for generating flakes that are compatible with all operating systems
    flake-utils.url = "github:numtide/flake-utils";

    # The version of the Panfactum framework to use
    panfactum.url = "github:panfactum/stack/main";
  };

  outputs = { panfactum, flake-utils, ... }@inputs:
    flake-utils.lib.eachDefaultSystem
    (system:
      {
        devShell = panfactum.lib.${system}.mkDevShell { };
      }
    );
}
