class MyEditorScript {
        static String[] SCENES = FindEnabledEditorScenes();

        static String APP_NAME = "Elements";
        static String TARGET_DIR = "C:/Users/Aaron/Desktop";

        [MenuItem ("Custom/Build Android")]
        static void PerformAndroidBuild ()
        {
                 String target_dir = APP_NAME + ".apk";
                 GenericBuild(SCENES, TARGET_DIR + "/" + target_dir, BuildTarget.Android() {
		List<String> EditorScenes = new List<String>();
		foreach(EditorBuildSettingsScene scene in EditorBuildSettings.scenes) {
			if (!scene.enabled) continue;
			EditorScenes.Add(scene.path);
		}
		return EditorScenes.ToArray();
	}

        static void GenericBuild(String[] scenes, String target_dir, BuildTarget build_target, BuildOptions build_options)
        {
                EditorUserBuildSettings.SwitchActiveBuildTarget(build_target);
                String res = BuildPipeline.BuildPlayer(scenes,target_dir,build_target,build_options);
                if (res.Length > 0) {
                        throw new Exception("BuildPlayer failure: " + res);
                }
        }
}