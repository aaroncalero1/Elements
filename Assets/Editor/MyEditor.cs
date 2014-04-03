using UnityEditor;
using UnityEngine;
using System.Collections.Generic;
using System;

class MyEditorScript {
        static string[] SCENES = FindEnabledEditorScenes();

        static string APP_NAME = "Elements";
        static string TARGET_DIR = "C:/Users/Gontzal/Desktop";

        [MenuItem ("Custom/Build Android")]
        static void PerformAndroidBuild ()
        {
                 string target_dir = APP_NAME + ".apk";
                 GenericBuild(SCENES, TARGET_DIR + "/" + target_dir, BuildTarget.Android, BuildOptions.None);
        }
        private static string[] FindEnabledEditorScenes(){
		List<string> EditorScenes = new List<string>();
		foreach(EditorBuildSettingsScene scene in EditorBuildSettings.scenes) {
			if (!scene.enabled) continue;
			EditorScenes.Add(scene.path);
		}
		return EditorScenes.ToArray();
	}

        static void GenericBuild(string[] scenes, string target_dir, BuildTarget build_target, BuildOptions build_options)
        {
                EditorUserBuildSettings.SwitchActiveBuildTarget(build_target);
                string res = BuildPipeline.BuildPlayer(scenes,target_dir,build_target,build_options);
                if (res.Length > 0) {
                        throw new Exception("BuildPlayer failure: " + res);
                }
        }
}

public static class AndroidSDKFolder{
    public static string Path{
        get{return EditorPrefs.GetString("AndroidSdkRoot");}
        set{EditorPrefs.SetString("AndroidSdkRoot", "C:/android-sdk/adt-bundle-windows-x86_64-20131030/sdk");}
    }
}